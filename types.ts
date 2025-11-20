
export interface City {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  visualPrompt: string;
}

export interface GeneratedImage {
  cityId: string;
  dataUrl: string;
}

export enum TileType {
  EMPTY = 'EMPTY',
  VOID = 'VOID',
  OBJECT = 'OBJECT',
  STAIRS_UP = 'STAIRS_UP',
  STAIRS_DOWN = 'STAIRS_DOWN',
}

export enum ObjectType {
  LAMPOST = 'LAMPOST',
  FLAGPOLE = 'FLAGPOLE',
  BANISTER = 'BANISTER',
}

export enum VisualVariant {
  BLOCK = 'BLOCK',
  VAULT = 'VAULT',
  ARCH_X = 'ARCH_X',
  ARCH_Y = 'ARCH_Y',
}

export interface Coord {
  x: number;
  y: number;
  z: number;
}

export interface Tile {
  id: string;
  type: TileType;
  coords: Coord;
  visualVariant?: VisualVariant;
  objectType?: ObjectType;
  visited?: boolean;
}

export interface Player {
  coords: Coord;
}

export interface Memory {
  id: string;
  title: string;
  content: string;
  objectType: ObjectType;
  timestamp: string;
}
