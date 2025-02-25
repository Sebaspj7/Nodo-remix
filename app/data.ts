////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Remix, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";

type ContactMutation = {
  id?: string;
  first?: string;
  last?: string;
  avatar?: string;
  twitter?: string;
  notes?: string;
  favorite?: boolean;
};

export type ContactRecord = ContactMutation & {
  id: string;
  createdAt: string;
};

////////////////////////////////////////////////////////////////////////////////
// This is just a fake DB table. In a real app you'd be talking to a real db or
// fetching from an existing API.
const fakeContacts = {
  records: {} as Record<string, ContactRecord>,

  async getAll(): Promise<ContactRecord[]> {
    return Object.keys(fakeContacts.records)
      .map((key) => fakeContacts.records[key])
      .sort(sortBy("-createdAt", "last"));
  },

  async get(id: string): Promise<ContactRecord | null> {
    return fakeContacts.records[id] || null;
  },

  async create(values: ContactMutation): Promise<ContactRecord> {
    const id = values.id || Math.random().toString(36).substring(2, 9);
    const createdAt = new Date().toISOString();
    const newContact = { id, createdAt, ...values };
    fakeContacts.records[id] = newContact;
    return newContact;
  },

  async set(id: string, values: ContactMutation): Promise<ContactRecord> {
    const contact = await fakeContacts.get(id);
    invariant(contact, `No contact found for ${id}`);
    const updatedContact = { ...contact, ...values };
    fakeContacts.records[id] = updatedContact;
    return updatedContact;
  },

  destroy(id: string): null {
    delete fakeContacts.records[id];
    return null;
  },
};

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions
export async function getContacts(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let contacts = await fakeContacts.getAll();
  if (query) {
    contacts = matchSorter(contacts, query, {
      keys: ["first", "last"],
    });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createEmptyContact() {
  const contact = await fakeContacts.create({});
  return contact;
}

export async function getContact(id: string) {
  return fakeContacts.get(id);
}

export async function updateContact(id: string, updates: ContactMutation) {
  const contact = await fakeContacts.get(id);
  if (!contact) {
    throw new Error(`No contact found for ${id}`);
  }
  await fakeContacts.set(id, { ...contact, ...updates });
  return contact;
}

export async function deleteContact(id: string) {
  fakeContacts.destroy(id);
}

[
  {
    avatar:
      "../images/Atlético_Nacional.png",
      first: "Atlético",
      last: "Nacional",
      twitter: "@nacionaloficial",
  },
  {
    avatar:
      "../images/santafe.png",
      first: "Independiente",
      last: "Santa Fe",
      twitter: "@SantaFe",
  },
  {
    avatar:
      "../images/Millonarios.png",
      first: "Millonarios",
      last: "FC",
      twitter: "@MillosFCoficial",
  },
  {
    avatar:
      "../images/America.png",
      first: "América",
      last: "de Cali",
      twitter: "@AmericadeCali",
  },
  {
    avatar:
      "../images/Junior.png",
      first: "Atlético",
      last: "Junior",
      twitter: "@JuniorClubSA",
  },
  {
    avatar:
      "../images/Cali.png",
      first: "Deportivo",
      last: "Cali",
      twitter: "@AsoDeporCali",
  },
  {
    avatar:
      "../images/Once_Caldas.png",
    first: "Once",
      last: "Caldas",
      twitter: "@oncecaldas",
  },
  {
    avatar:
      "../images/Pasto.png",
      first: "Deportivo",
      last: "Pasto",
      twitter: "@DeporPasto",
  },
  {
    avatar:
      "../images/Medellín.png",
      first: "Independiente",
      last: "Medellín",
      twitter: "@DIM_Oficial",
  },
  {
    avatar:
      "../images/Tolima.png",
      first: "Deportes",
      last: "Tolima",
      twitter: "@cdtolima",
  },
  
  
].forEach((contact) => {
  fakeContacts.create({
    ...contact,
    id: `${contact.first.toLowerCase()}-${contact.last.toLocaleLowerCase()}`,
  });
});
