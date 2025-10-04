
export interface Person {
  id: string;
  name: string;
  profile: string;
  mentions: string[];
}

export interface Connection {
  source: string; // id of source person
  target: string; // id of target person
}

export interface Operation {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  people: Person[];
  connections: Connection[];
}
