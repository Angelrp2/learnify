'use strict';

module.exports = {
  register() {},

  async bootstrap({ strapi }) {
    const existing = await strapi.entityService.count('api::category.category');
    if (existing > 0) return;

    const cat1 = await strapi.entityService.create('api::category.category', {
      data: { name: 'Frontend', slug: 'frontend', description: 'Desarrollo de interfaces de usuario modernas', publishedAt: new Date() },
    });
    const cat2 = await strapi.entityService.create('api::category.category', {
      data: { name: 'Backend', slug: 'backend', description: 'Desarrollo del lado del servidor y APIs', publishedAt: new Date() },
    });
    const cat3 = await strapi.entityService.create('api::category.category', {
      data: { name: 'DevOps', slug: 'devops', description: 'Despliegue, CI/CD e infraestructura', publishedAt: new Date() },
    });

    const instructor = await strapi.entityService.create('api::instructor.instructor', {
      data: { name: 'Ana García', email: 'ana@learnify.dev', bio: 'Desarrolladora fullstack con 10 años de experiencia en tecnologías web modernas.', publishedAt: new Date() },
    });

    const courses = [
      { title: 'JavaScript desde Cero', slug: 'javascript-desde-cero', description: 'Aprende los fundamentos de JavaScript: variables, funciones, arrays y objetos.', difficulty: 'beginner', category: cat1.id },
      { title: 'React para Principiantes', slug: 'react-para-principiantes', description: 'Construye interfaces modernas con React, hooks y gestión de estado.', difficulty: 'intermediate', category: cat1.id },
      { title: 'Tailwind CSS Completo', slug: 'tailwind-css-completo', description: 'Diseña UIs profesionales con Tailwind CSS y su sistema de utilidades.', difficulty: 'beginner', category: cat1.id },
      { title: 'Node.js y Express', slug: 'nodejs-express', description: 'Crea APIs REST robustas con Node.js, Express y buenas prácticas.', difficulty: 'intermediate', category: cat2.id },
      { title: 'PostgreSQL Avanzado', slug: 'postgresql-avanzado', description: 'Modelado de datos, consultas complejas y optimización en PostgreSQL.', difficulty: 'advanced', category: cat2.id },
      { title: 'Docker y Kubernetes', slug: 'docker-kubernetes', description: 'Contenedores, orquestación y despliegue escalable con Docker y Kubernetes.', difficulty: 'advanced', category: cat3.id },
    ];

    for (const c of courses) {
      const course = await strapi.entityService.create('api::course.course', {
        data: {
          title: c.title,
          slug: c.slug,
          description: c.description,
          difficulty: c.difficulty,
          duration: Math.floor(Math.random() * 20) + 5,
          seoTitle: `${c.title} | Learnify`,
          seoDescription: c.description,
          category: c.category,
          instructor: instructor.id,
          publishedAt: new Date(),
        },
      });

      await strapi.entityService.create('api::lesson.lesson', {
        data: { title: 'Introducción y configuración del entorno', content: 'En esta lección aprenderás a configurar tu entorno de desarrollo y los conceptos fundamentales del curso.', order: 1, duration: 15, course: course.id, publishedAt: new Date() },
      });
      await strapi.entityService.create('api::lesson.lesson', {
        data: { title: 'Conceptos fundamentales', content: 'Exploraremos los conceptos clave que necesitás dominar para avanzar con confianza en el resto del curso.', order: 2, duration: 20, course: course.id, publishedAt: new Date() },
      });
    }

    const blogPosts = [
      { title: '5 razones para aprender JavaScript en 2024', slug: '5-razones-javascript-2024', excerpt: 'JavaScript sigue siendo el lenguaje más demandado. Te explicamos por qué vale la pena aprenderlo este año.', content: 'JavaScript domina el desarrollo web desde hace más de una década. Su versatilidad, comunidad y ecosistema lo hacen indispensable tanto para frontend como backend. En este artículo exploramos cinco razones concretas por las que invertir tiempo en aprenderlo es una decisión acertada.', readingTime: 5, category: cat1.id, author: instructor.id },
      { title: 'Por qué elegir Astro para tu próximo proyecto', slug: 'por-que-elegir-astro', excerpt: 'Astro propone una arquitectura de islas que mejora el rendimiento sin sacrificar la experiencia de desarrollo.', content: 'Astro es un framework moderno que genera HTML estático por defecto y solo hidrata componentes cuando es necesario. Esto resulta en sitios extremadamente rápidos con excelente puntuación en Core Web Vitals, lo que impacta directamente en el SEO.', readingTime: 7, category: cat1.id, author: instructor.id },
      { title: 'Docker: contenedores para desarrolladores web', slug: 'docker-contenedores-web', excerpt: 'Aprende qué es Docker, para qué sirve y cómo puede simplificar tu flujo de trabajo como desarrollador.', content: 'Docker permite empaquetar una aplicación con todas sus dependencias en un contenedor portable. Esto elimina el clásico problema de "en mi máquina funciona" y facilita el despliegue consistente en cualquier entorno.', readingTime: 6, category: cat3.id, author: instructor.id },
    ];

    for (const post of blogPosts) {
      await strapi.entityService.create('api::blog-post.blog-post', {
        data: { ...post, seoTitle: `${post.title} | Learnify Blog`, seoDescription: post.excerpt, publishedAt: new Date() },
      });
    }

    strapi.log.info('Seed completado: 3 categorías, 1 instructor, 6 cursos, 3 blog posts.');
  },
};
