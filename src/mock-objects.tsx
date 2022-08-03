export const projects = [
  {
    name: "Ui docs",
    description: "This is  a sample project",
    createdBy: "Seshathri",
  },
  {
    name: "Server docs",
    description: "This is  a sample project",
    createdBy: "Seshathri",
  },
  {
    name: "Implementation docs ",
    description: "This is  a sample project",
    createdBy: "Seshathri",
  },
  {
    name: "Operating systems",
    description: "This is  a sample project",
    createdBy: "Seshathri",
  },
];

export const project = {
  name: "Operating systems",
  description: "This is about operating systems",
  pages: [
    {
      name: "Introduction",
      content: JSON.stringify([
        {
          type: "paragraph",
          align: "center",
          children: [{ text: "OS Intro" }],
        },
      ]),
    },
    {
      name: "what is OS?",
      content: JSON.stringify([
        {
          type: "paragraph",
          align: "center",
          children: [{ text: "What is os" }],
        },
      ]),
    },
    {
      name: "Types of OS",
      content: JSON.stringify([
        {
          type: "paragraph",
          align: "center",
          children: [{ text: "Types of os" }],
        },
      ]),
    },
  ],
};

export const notifications = [
  {
    title: "Project created",
    description: "You created the project on 21st July 2020",
    time: "",
  },
  {
    title: "Project updated",
    description: "You updated the project on 21st July 2020",
    time: "",
  },
  {
    title: "Page created",
    description: "You created the project on 21st July 2020",
    time: "",
  },
];
