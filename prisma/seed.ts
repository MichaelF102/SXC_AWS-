import { PrismaClient } from "@prisma/client";
import {
  INITIAL_DEPARTMENTS,
  INITIAL_TEAM_MEMBERS,
  INITIAL_EVENTS,
  INITIAL_PROJECTS,
  INITIAL_GALLERY,
  INITIAL_AWS_MODULES,
  INITIAL_CONTACT_MESSAGES,
} from "../lib/data/initialData";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding SXC AWS Club PostgreSQL Database...");

  // 1. Seed Departments
  for (const dept of INITIAL_DEPARTMENTS) {
    await prisma.department.upsert({
      where: { slug: dept.slug },
      update: {},
      create: {
        id: dept.id,
        name: dept.name,
        slug: dept.slug,
        description: dept.description,
        order: dept.order,
      },
    });
  }
  console.log("✅ Departments seeded.");

  // 2. Seed Team Members
  for (const member of INITIAL_TEAM_MEMBERS) {
    await prisma.teamMember.upsert({
      where: { id: member.id },
      update: {},
      create: {
        id: member.id,
        name: member.name,
        position: member.position,
        departmentId: member.departmentId,
        bio: member.bio,
        photoUrl: member.photoUrl,
        linkedin: member.linkedin,
        github: member.github,
        email: member.email,
        isExecutive: member.isExecutive,
        skills: member.skills,
        order: member.order,
      },
    });
  }
  console.log("✅ Team Members seeded.");

  // 3. Seed Events
  for (const event of INITIAL_EVENTS) {
    await prisma.event.upsert({
      where: { slug: event.slug },
      update: {},
      create: {
        id: event.id,
        title: event.title,
        slug: event.slug,
        description: event.description,
        fullDetails: event.fullDetails,
        date: new Date(event.date),
        time: event.time,
        venue: event.venue,
        category: event.category,
        status: event.status,
        isFeatured: event.isFeatured,
        imageUrl: event.imageUrl,
        bannerUrl: event.bannerUrl,
        speakerNames: event.speakerNames,
        prerequisites: event.prerequisites,
        agenda: event.agenda,
        maxSeats: event.maxSeats,
        currentRegistrations: event.currentRegistrations,
      },
    });
  }
  console.log("✅ Events seeded.");

  // 4. Seed Projects
  for (const project of INITIAL_PROJECTS) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: {
        id: project.id,
        title: project.title,
        slug: project.slug,
        shortDesc: project.shortDesc,
        problem: project.problem,
        solution: project.solution,
        technologies: project.technologies,
        awsServices: project.awsServices,
        imageUrl: project.imageUrl,
        githubUrl: project.githubUrl,
        liveDemoUrl: project.liveDemoUrl,
        isFeatured: project.isFeatured,
        members: {
          create: project.members.map((m) => ({
            name: m.name,
            role: m.role,
            avatarUrl: m.avatarUrl,
          })),
        },
      },
    });
  }
  console.log("✅ Projects seeded.");

  // 5. Seed Gallery
  for (const item of INITIAL_GALLERY) {
    await prisma.galleryImage.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id,
        title: item.title,
        description: item.description,
        category: item.category,
        imageUrl: item.imageUrl,
        date: new Date(item.date),
        featured: item.featured,
      },
    });
  }
  console.log("✅ Gallery seeded.");

  // 6. Seed AWS Modules
  for (const mod of INITIAL_AWS_MODULES) {
    await prisma.aWSModule.upsert({
      where: { slug: mod.slug },
      update: {},
      create: {
        id: mod.id,
        title: mod.title,
        slug: mod.slug,
        serviceCode: mod.serviceCode,
        category: mod.category,
        difficulty: mod.difficulty,
        shortDesc: mod.shortDesc,
        description: mod.description,
        iconName: mod.iconName,
        keyConcepts: mod.keyConcepts,
        cliExamples: mod.cliExamples,
        labGuide: mod.labGuide,
        order: mod.order,
        resources: {
          create: mod.resources.map((r) => ({
            title: r.title,
            url: r.url,
            type: r.type,
          })),
        },
      },
    });
  }
  console.log("✅ AWS Modules seeded.");

  // 7. Seed Contact Messages
  for (const msg of INITIAL_CONTACT_MESSAGES) {
    await prisma.contactMessage.upsert({
      where: { id: msg.id },
      update: {},
      create: {
        id: msg.id,
        name: msg.name,
        email: msg.email,
        subject: msg.subject,
        message: msg.message,
        isRead: msg.isRead,
        createdAt: new Date(msg.createdAt),
      },
    });
  }
  console.log("✅ Contact Messages seeded.");

  console.log("🚀 SXC AWS Club database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
