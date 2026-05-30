export function searchCourses(courses, query) {
  if (!query) return courses;

  const regex = new RegExp(query, 'i');
  return courses.filter(course => {
    const { attributes } = course;
    return (
      regex.test(attributes.title) ||
      regex.test(attributes.description) ||
      regex.test(attributes.content)
    );
  });
}

export function filterCourses(courses, filters) {
  let filtered = courses;

  if (filters.difficulty && filters.difficulty.length > 0) {
    filtered = filtered.filter(course =>
      filters.difficulty.includes(course.attributes.difficulty)
    );
  }

  if (filters.category) {
    filtered = filtered.filter(course =>
      course.attributes.category?.data?.id === filters.category
    );
  }

  return filtered;
}

export function paginateCourses(courses, page = 1, pageSize = 6) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedCourses = courses.slice(start, end);
  const totalPages = Math.ceil(courses.length / pageSize);

  return {
    courses: paginatedCourses,
    currentPage: page,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}

export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validateForm(data) {
  const errors = {};

  if (!data.name || data.name.trim().length < 3) {
    errors.name = 'El nombre debe tener al menos 3 caracteres';
  }

  if (!validateEmail(data.email)) {
    errors.email = 'Email inválido';
  }

  if (!data.subject || data.subject.trim().length < 5) {
    errors.subject = 'El asunto debe tener al menos 5 caracteres';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function calculateReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}

export function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
