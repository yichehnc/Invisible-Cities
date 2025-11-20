import React, { useMemo, useState, useEffect } from 'react';
import { Player, Tile, TileType, ObjectType, VisualVariant } from '../types';
import { TILE_WIDTH, TILE_HEIGHT } from '../constants';

interface CityViewProps {
  tiles: Tile[];
  player: Player;
  onTileClick: (tile: Tile) => void;
}

const CityView: React.FC<CityViewProps> = ({ tiles, player, onTileClick }) => {
  const [viewBox, setViewBox] = useState("0 0 1000 1000");

  // Calculate isometric positions
  const getIsoPos = (x: number, y: number, z: number) => {
    const isoX = (x - y) * (TILE_WIDTH / 2);
    const isoY = (x + y) * (TILE_HEIGHT / 2) - (z * TILE_HEIGHT);
    return { x: isoX, y: isoY };
  };

  // Render list sorting: Painter's Algorithm
  const renderItems = useMemo(() => {
    const items: any[] = [...tiles];

    // Add Player to the render list as a specialized item
    items.push({
      id: 'PLAYER',
      isPlayer: true,
      coords: { 
        x: player.coords.x, 
        y: player.coords.y, 
        z: player.coords.z 
      },
      type: TileType.EMPTY,
      visited: true
    });

    // Sort: Back to Front
    // Primary: x + y (diagonal depth)
    // Secondary: z (vertical height)
    return items.sort((a, b) => {
      const depthA = a.coords.x + a.coords.y;
      const depthB = b.coords.x + b.coords.y;
      if (depthA !== depthB) return depthA - depthB;
      
      // For objects at same grid pos, higher Z draws on top (usually)
      // Special case: Player stands ON a tile.
      // If Player.z == Tile.z, Player should draw AFTER Tile.
      // If Tile is a wall at Z+1, it should draw AFTER Player at Z.
      if (a.coords.z !== b.coords.z) return a.coords.z - b.coords.z;
      
      // Tie-breaker: Player is usually "content" on top of a floor
      if (a.isPlayer) return 1;
      if (b.isPlayer) return -1;
      
      return 0;
    });
  }, [tiles, player]);

  // Adjust ViewBox to center the map
  useEffect(() => {
    if (tiles.length === 0) return;
    // Simple auto-center logic
    const xs = tiles.map(t => (t.coords.x - t.coords.y) * (TILE_WIDTH / 2));
    const ys = tiles.map(t => (t.coords.x + t.coords.y) * (TILE_HEIGHT / 2) - (t.coords.z * TILE_HEIGHT));
    
    const minX = Math.min(...xs) - 200;
    const maxX = Math.max(...xs) + 200;
    const minY = Math.min(...ys) - 200;
    const maxY = Math.max(...ys) + 200;
    
    setViewBox(`${minX} ${minY} ${maxX - minX} ${maxY - minY}`);
  }, [tiles.length]);

  // --- SVG Drawing Helpers ---

  const BlockPath = () => {
    // Standard Isometric Cube
    // w=64, h=32 (half-height of top diamond)
    // Full height of block visual = TILE_HEIGHT * 2 usually for a cube
    // Vertices relative to center bottom
    const w = TILE_WIDTH / 2;
    const h = TILE_HEIGHT / 2;
    const d = TILE_HEIGHT; // vertical extrusion depth

    return {
      top: `M 0 ${-d} L ${w} ${-d - h} L 0 ${-d - h * 2} L ${-w} ${-d - h} Z`,
      left: `M ${-w} ${-d - h} L 0 ${-d} L 0 0 L ${-w} ${-h} Z`,
      right: `M 0 ${-d} L ${w} ${-d - h} L ${w} ${-h} L 0 0 Z`,
      outline: `M ${-w} ${-h} L 0 0 L ${w} ${-h} L ${w} ${-d - h} L 0 ${-d - h * 2} L ${-w} ${-d - h} Z`
    };
  };

  const ArchPath = (axis: 'x' | 'y') => {
    // Cube with a hole
    const w = TILE_WIDTH / 2;
    const h = TILE_HEIGHT / 2;
    const d = TILE_HEIGHT;
    
    // This is a simplification for 2D SVG
    // We draw the block but "black out" or "empty" the center
    
    // Standard block faces
    const top = `M 0 ${-d} L ${w} ${-d - h} L 0 ${-d - h * 2} L ${-w} ${-d - h} Z`;
    
    // For legs, we just draw two pillars
    // Left leg
    // Right leg
    // This is complex to do perfectly in single path, so we return full block but maybe add an overlay
    // Instead, let's just draw the standard block and an "arch" symbol on the visible faces
    
    return BlockPath(); // Fallback
  };

  const VaultPath = () => {
    // Rounded top
    const w = TILE_WIDTH / 2;
    const h = TILE_HEIGHT / 2;
    const d = TILE_HEIGHT;
    
    // Approximated curve with lines for "Etching" feel
    // Top is Dome-like
    // Just modify the top diamond to be curved? 
    // For etching style, we often just use the Block but with different hatching.
    // Let's try a slightly taller, rounded top outline
    
    return {
       ...BlockPath(),
       top: `M ${-w} ${-d-h} Q 0 ${-d-h*2 - 10} ${w} ${-d-h} L 0 ${-d} Z` // A bit fake but works
    };
  };

  const renderTile = (item: any) => {
    const pos = getIsoPos(item.coords.x, item.coords.y, item.coords.z);
    const isPlayer = item.isPlayer;
    
    // Visual Styles
    const visited = item.visited;
    const strokeColor = isPlayer ? "#2c2c2c" : (visited ? "#1a1a1a" : "#a0a0a0");
    const strokeWidth = isPlayer ? 2 : (visited ? 1.5 : 0.5);
    const fill = isPlayer ? "none" : (visited ? "url(#hatch)" : "#fdf6e3");
    const opacity = isPlayer ? 1 : (visited ? 1 : 0.3);

    if (isPlayer) {
      // Render Player Sprite
      return (
        <g key="player" transform={`translate(${pos.x}, ${pos.y})`} style={{ pointerEvents: 'none', zIndex: 100 }}>
            {/* Shadow */}
            <ellipse cx="0" cy="0" rx={TILE_WIDTH/3} ry={TILE_HEIGHT/3} fill="rgba(0,0,0,0.2)" />
            {/* Body */}
            <path d={`M 0 0 L 0 -40`} stroke="#2c2c2c" strokeWidth="2" />
            <circle cx="0" cy="-45" r="5" fill="#2c2c2c" />
            <circle cx="0" cy="-55" r="8" stroke="#2c2c2c" fill="none" opacity="0.5"/>
        </g>
      );
    }

    if (item.type === TileType.VOID) return null;

    const paths = (item.visualVariant === VisualVariant.VAULT) ? VaultPath() : BlockPath();

    // Special Handling for Objects
    const renderObject = () => {
      if (item.type !== TileType.OBJECT) return null;
      // Simple symbols for objects
      switch(item.objectType) {
          case ObjectType.LAMPOST:
              return <path d={`M 0 ${-TILE_HEIGHT} L 0 ${-TILE_HEIGHT - 40} M -5 ${-TILE_HEIGHT - 40} L 5 ${-TILE_HEIGHT - 40}`} stroke={strokeColor} strokeWidth="2" />;
          case ObjectType.FLAGPOLE:
              return <path d={`M 0 ${-TILE_HEIGHT} L 0 ${-TILE_HEIGHT - 50} L 15 ${-TILE_HEIGHT - 40} L 0 ${-TILE_HEIGHT - 30}`} stroke={strokeColor} fill={visited ? "#2c2c2c" : "none"} />;
          case ObjectType.BANISTER:
              return <path d={`M -10 ${-TILE_HEIGHT} L -10 ${-TILE_HEIGHT-15} L 10 ${-TILE_HEIGHT-15} L 10 ${-TILE_HEIGHT}`} stroke={strokeColor} fill="none" />;
          default:
              return <circle cx="0" cy={-TILE_HEIGHT - 10} r="3" fill={strokeColor} />;
      }
    };
    
    // Hatching logic: if visited, use hatch pattern. If not, just white with faint stroke.
    // We apply filter to simulate "ink bleed" or paper texture on visited tiles
    const filter = visited ? "" : ""; 

    // Handle Arches visually (cutout)
    const isArch = item.visualVariant === VisualVariant.ARCH_X || item.visualVariant === VisualVariant.ARCH_Y;
    const archHole = isArch ? (
        <path d={`M -10 ${-TILE_HEIGHT/2} Q 0 ${-TILE_HEIGHT - 10} 10 ${-TILE_HEIGHT/2} L 10 0 L -10 0 Z`} fill="#fdf6e3" stroke={strokeColor} />
    ) : null;

    // Standard Floor/Block Rendering
    return (
      <g 
        key={item.id} 
        transform={`translate(${pos.x}, ${pos.y})`}
        onClick={() => onTileClick(item)}
        className="transition-opacity duration-500"
        style={{ cursor: item.type === TileType.OBJECT ? 'pointer' : 'default', opacity }}
      >
         {/* Left Face */}
         <path d={paths.left} fill={visited ? "#eaddcf" : "#fff"} stroke={strokeColor} strokeWidth={strokeWidth} />
         {/* Right Face (darker for fake shading) */}
         <path d={paths.right} fill={visited ? "#dcd3c0" : "#fff"} stroke={strokeColor} strokeWidth={strokeWidth} />
         {/* Top Face */}
         <path d={paths.top} fill={fill} stroke={strokeColor} strokeWidth={strokeWidth} />
         
         {isArch && archHole}
         
         {renderObject()}

         {/* Stairs Steps Overlay if needed */}
         {(item.type === TileType.STAIRS_UP || item.type === TileType.STAIRS_DOWN) && (
             <g transform={`translate(0, ${-TILE_HEIGHT})`}>
                 {[0,1,2].map(i => (
                     <path key={i} d={`M -10 ${i*5} L 10 ${i*5}`} stroke={strokeColor} />
                 ))}
             </g>
         )}
      </g>
    );
  };

  return (
    <div className="w-full h-full overflow-hidden bg-[#fdf6e3]">
      <svg 
        width="100%" 
        height="100%" 
        viewBox={viewBox} 
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
      >
        <defs>
          {/* Hatching Pattern for Visited Areas */}
          <pattern id="hatch" patternUnits="userSpaceOnUse" width="4" height="4" patternTransform="rotate(45)">
            <path d="M 0,4 l 4,0" stroke="#000000" strokeWidth="0.5" opacity="0.2" />
          </pattern>
          {/* Dense Hatching for Shadows */}
          <pattern id="hatch-dense" patternUnits="userSpaceOnUse" width="3" height="3" patternTransform="rotate(-45)">
             <path d="M 0,3 l 3,0" stroke="#000000" strokeWidth="0.8" opacity="0.3" />
          </pattern>
        </defs>
        
        <g transform="translate(0, 100)"> {/* Global offset if needed */}
            {renderItems.map(renderTile)}
        </g>
      </svg>
    </div>
  );
};

export default CityView;
