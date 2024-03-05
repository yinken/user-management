import { getUUID } from "@/utils/strings";
import { User } from "@/views/users/UserTable";
import { MAX_CHATS, ROLES, TIERS, Widget } from "@/views/widgets/WidgetTable";
import * as React from "react";

const FIRST_NAMES = [
  "John",
  "Jane",
  "Bob",
  "Alice",
  "Eve",
  "Chris",
  "Samantha",
  "Dylan",
  "Megan",
  "Avery",
  "David",
  "Olivia",
  "Daniel",
  "Sophia",
  "Michael",
  "Charlotte",
  "Matthew",
  "Amelia",
  "James",
  "Emma",
  "Andrew",
  "Madison",
  "Robert",
  "Emily",
  "William",
  "Abigail",
  "Joseph",
  "Isabella",
  "Charles",
  "Mia",
  "Thomas",
  "Ava",
  "Henry",
  "Harper",
  "George",
  "Ella",
  "Richard",
  "Scarlett",
  "Paul",
  "Grace",
  "Edward",
  "Chloe",
  "Peter",
  "Victoria",
  "Kenneth",
  "Madelyn",
  "Steven",
  "Lily",
  "Brian",
  "Zoe",
];

const LAST_NAMES = [
  "Smith",
  "Johnson",
  "Williams",
  "Jones",
  "Brown",
  "Davis",
  "Miller",
  "Wilson",
  "Moore",
  "Taylor",
  "Anderson",
  "Thomas",
  "Jackson",
  "White",
  "Harris",
  "Martin",
  "Thompson",
  "Garcia",
  "Martinez",
  "Robinson",
  "Clark",
  "Rodriguez",
  "Lewis",
  "Lee",
  "Walker",
  "Hall",
  "Allen",
  "Young",
  "Hernandez",
  "King",
  "Wright",
  "Lopez",
  "Hill",
  "Scott",
  "Green",
  "Adams",
  "Baker",
  "Gonzalez",
  "Nelson",
  "Carter",
  "Mitchell",
  "Perez",
  "Roberts",
  "Turner",
  "Phillips",
  "Campbell",
  "Parker",
  "Evans",
  "Edwards",
  "Collins",
  "Stewart",
  "Sanchez",
];

const PREFIXES = [
  "Avenger",
  "Harbinger",
  "Vindicator",
  "Champion",
  "Defender",
  "Guardian",
  "Sentinel",
  "Protector",
  "Warden",
  "Paladin",
  "Crusader",
  "Warrior",
  "Knight",
  "Berserker",
  "Gladiator",
  "Vanquisher",
  "Conqueror",
  "Savior",
  "Hero",
  "Vigilante",
  "Enforcer",
  "Pioneer",
  "Ranger",
  "Pathfinder",
  "Explorer",
  "Adventurer",
  "Seeker",
  "Hunter",
  "Scout",
  "Trailblazer",
  "Voyager",
  "Navigator",
  "Pilgrim",
  "Wanderer",
  "Nomad",
  "Rover",
  "Globetrotter",
  "Journeyer",
  "Traveler",
  "Marauder",
  "Raider",
  "Invader",
  "Infiltrator",
  "Assassin",
  "Reaper",
  "Slayer",
  "Destroyer",
  "Annihilator",
  "Exterminator",
  "Eradicator",
  "Obliterator",
];

const SUFFIXES = [
  "of Fire",
  "of Darkness",
  "of the Void",
  "of the Light",
  "of the Abyss",
  "of Liberty",
  "of the People",
  "of the Stars",
  "of the Moon",
  "of the Sun",
  "of the Ocean",
  "of the Earth",
  "of the Sky",
  "of the Wind",
  "of the Storm",
  "of the Mountain",
  "of the Forest",
  "of the Desert",
  "of the Jungle",
  "of the River",
  "of the Sea",
  "of the Galaxy",
  "of the Universe",
  "of the Comet",
  "of the Meteor",
  "of the Eclipse",
  "of the Dawn",
  "of the Dusk",
  "of the Day",
  "of the Night",
  "of the North",
  "of the South",
  "of the East",
  "of the West",
  "of the Winter",
  "of the Spring",
  "of the Summer",
  "of the Autumn",
  "of the Snow",
  "of the Rain",
  "of the Thunder",
  "of the Lightning",
  "of the Ice",
  "of the Flame",
  "of the Shadow",
  "of the Light",
  "of the Dream",
  "of the Reality",
  "of the Past",
  "of the Future",
];

const widgetIds = Array.from({ length: 100 }, () => getUUID());

const getRole = () => {
  const roles = Object.values(ROLES);
  const rdx = Math.floor(Math.random() * roles.length);
  return roles[rdx];
};

const getTier = () => {
  const tiers = Object.values(TIERS);
  const rdx = Math.floor(Math.random() * tiers.length);
  return tiers[rdx];
};

const getMaxChats = () => {
  const maxChats = Object.values(MAX_CHATS);
  const rdx = Math.floor(Math.random() * maxChats.length);
  return maxChats[rdx];
};

const getWidgets = (numberOfWidgets: number) => {
  const widgets = [];
  for (let i = 0; i < numberOfWidgets; i++) {
    const rdx3 = Math.floor(Math.random() * PREFIXES.length);
    const rdx4 = Math.floor(Math.random() * SUFFIXES.length);
    widgets.push({
      name: `${PREFIXES[rdx3]} ${SUFFIXES[rdx4]}`,
      id: widgetIds[i],
      role: getRole(),
      tier: getTier(),
      maxChats: getMaxChats(),
    });
  }
  return widgets;
};

const getRandomWidgets = (widgets: Widget[], count: number) => {
  const shuffled = [...widgets].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const useDummyData = () => {
  const widgets = React.useMemo(() => {
    return getWidgets(100);
  }, []);
  const users: User[] = React.useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => {
      const rdx1 = Math.floor(Math.random() * FIRST_NAMES.length);
      const rdx2 = Math.floor(Math.random() * LAST_NAMES.length);

      const name = `${FIRST_NAMES[rdx1]} ${LAST_NAMES[rdx2]}`;
      const email = `${FIRST_NAMES[rdx1].toLowerCase()}.${LAST_NAMES[
        rdx2
      ].toLowerCase()}@company.com`;

      const numberOfWidgets = Math.floor(Math.random() * 100);

      return {
        id: getUUID(),
        name,
        email,
        widgets: getRandomWidgets(widgets, numberOfWidgets),
        status: i % 3 === 0 ? "online" : i % 3 === 1 ? "offline" : "pause",
        avatar: `https://i.pravatar.cc/250?u=${email}`,
      };
    });
  }, [widgets]);
  return { users, getWidgets, widgets };
};
