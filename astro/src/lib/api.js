const STRAPI_URL = import.meta.env.STRAPI_URL || 'http://localhost:1337';

export async function fetchCourses() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/courses?populate=*`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

export async function fetchCourseBySlug(slug) {
  try {
    const response = await fetch(
      `${STRAPI_URL}/api/courses?filters[slug][$eq]=${slug}&populate=*`
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data.data?.[0] || null;
  } catch (error) {
    console.error('Error fetching course:', error);
    return null;
  }
}

export async function fetchCategories() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/categories`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

export async function fetchBlogPosts() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/blog-posts?populate=*`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function submitContactForm(formData) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/contact-submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
}
