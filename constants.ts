
import { City } from './types';

export const TILE_WIDTH = 128;
export const TILE_HEIGHT = 64;

const ETCHING_STYLE = "A high-quality axonometric etching, M.C. Escher style, black ink on white paper, cross-hatching texture, detailed linework, white background.";

export const CITIES: City[] = [
  {
    id: 'zaira',
    name: 'Zaira',
    subtitle: 'Citie & Memory 3',
    description: "In vain, great-hearted Kublai, shall I attempt to describe Zaira, city of high bastions. The city does not consist of this, but of relationships between the measurements of its space and the events of its past: the height of a lamppost and the distance from the ground of a hanged usurper’s swaying feet... The city soaks it up like a sponge and expands... containing its past like the lines of a hand.",
    visualPrompt: `${ETCHING_STYLE} A city of high bastions and impossible stairways. The architecture is covered in small scribbles, notches, and lines like a palm print. Interconnected bridges, lampposts with tangled wires, and steep stone steps.`
  },
  {
    id: 'armilla',
    name: 'Armilla',
    subtitle: 'Thin Cities 3',
    description: "The fact remains that it has no walls, no ceilings, no floors: it has nothing that makes it seem a city except the water pipes that rise vertically where the houses should be... a forest of pipes that end in taps, showers, spouts, overflows... Against the sky a lavabo's white stands out... The streams of water channeled in the pipes of Armilla have remained in the possession of nymphs and naiads.",
    visualPrompt: `${ETCHING_STYLE} A city with no walls or floors, only a complex vertical forest of plumbing pipes, valves, and bathtubs floating in the air. Water sprays from spouts. Nymphs resting in floating porcelain tubs. Surreal, airy composition.`
  },
  {
    id: 'zobeide',
    name: 'Zobeide',
    subtitle: 'Cities & Desire 5',
    description: "The white city, well exposed to the moon, with streets wound about themselves as in a skein. They tell this tale of its foundation: men of various nations had an identical dream... they decided to build a city like the one in the dream... arranging spaces and walls so the dream fugitive would be unable to escape again.",
    visualPrompt: `${ETCHING_STYLE} A white city under a moon. The streets are curved and wind around themselves like a ball of yarn. High blank walls designed to trap, spiral layouts, maze-like architecture, dreamlike and claustrophobic.`
  },
  {
    id: 'moriana',
    name: 'Moriana',
    subtitle: 'Cities & Eyes 5',
    description: "Its alabaster gates transparent in the sunlight, its coral columns... cities like this have an obverse: you have only to walk a semi-circle and you will come into view of Moriana's hidden face, an expanse of rusting sheet metal, sackcloths, planks bristling with spikes... It consists only of a face and an obverse, like a sheet of paper, with a figure on either side.",
    visualPrompt: `${ETCHING_STYLE} A two-faced city split down the middle. On the left, beautiful alabaster and glass towers. On the right, a dark mess of rusting sheet metal, spikes, and junk. The transition is sharp, like a sheet of paper with two sides.`
  },
  {
    id: 'ersilia',
    name: 'Ersilia',
    subtitle: 'Trading Cities 4',
    description: "In Ersilia, to establish the relationships that sustain the city's life, the inhabitants stretch strings from the corners of the houses, white or black or gray... When the strings become so numerous that you can no longer pass among them, the inhabitants leave: the houses are dismantled; only the strings and their supports remain... Spiderwebs of intricate relationships seeking a form.",
    visualPrompt: `${ETCHING_STYLE} A landscape of ruins where houses have been dismantled, leaving only a chaotic, dense spiderweb of strings (white, black, gray) stretched between remaining posts and corners. Intricate geometric web patterns against a void.`
  },
  {
    id: 'thekla',
    name: 'Thekla',
    subtitle: 'Cities & the Sky 3',
    description: "Those who arrive at Thekla can see little of the city, beyond the plank fences, the sackcloth screens, the scaffoldings... If you ask 'Why is Thekla's construction taking such a long time?' they answer 'So that its destruction cannot begin.'... Work stops at sunset... The sky is filled with stars. 'There is the blueprint,' they say.",
    visualPrompt: `${ETCHING_STYLE} An infinite construction site at night. Elaborate wooden scaffolding, ladders, and cranes reaching up towards a sky filled with blueprint-like constellations and stars. Unfinished structures.`
  },
  {
    id: 'argia',
    name: 'Argia',
    subtitle: 'Cities & the Dead',
    description: "What makes Argia different from other cities is that it has earth instead of air. The streets are completely filled with dirt, clay packs the rooms to the ceiling, on every stair another stairway is set in negative... At night, putting your ear to the ground, you can sometimes hear a door slam.",
    visualPrompt: `${ETCHING_STYLE} A cross-section view of a city buried underground. Rooms and staircases are packed with dirt. Negative space architecture. Claustrophobic, heavy texture of soil and clay filling the voids.`
  },
  {
    id: 'olinda',
    name: 'Olinda',
    subtitle: 'Hidden Cities 1',
    description: "Olinda is certainly not the only city that grows in concentric circles... the old walls expand bearing the old quarters with them... a totally new Olinda which, in its reduced dimensions retains the features and the flow of lymph of the first Olinda. A point no bigger than the head of a pin.",
    visualPrompt: `${ETCHING_STYLE} A city growing in concentric circles like tree rings. In the center, a tiny microscopic city seen through a magnifying glass. Surrounding it, larger rings of older city walls and buildings expanding outward.`
  }
];
