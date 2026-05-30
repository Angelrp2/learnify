# Diagrama Entidad-Relación (E-R)

## Entidades y Relaciones

```
┌─────────────────┐
│   Categories    │
├─────────────────┤
│ id (PK)         │
│ name            │
│ slug            │
│ description     │
│ icon            │
│ color           │
└────────┬────────┘
         │
         │ 1:N
         ├─────────────────────┬──────────────────────┐
         │                     │                      │
         ▼                     ▼                      ▼
┌─────────────────┐   ┌──────────────────┐   ┌──────────────────┐
│    Courses      │   │   BlogPosts      │   │   (otros)        │
├─────────────────┤   ├──────────────────┤   └──────────────────┘
│ id (PK)         │   │ id (PK)          │
│ title           │   │ title            │
│ slug            │   │ slug             │
│ description     │   │ content          │
│ content         │   │ excerpt          │
│ difficulty      │   │ publishedAt      │
│ duration        │   │ category_id (FK) │
│ image           │   │ author_id (FK)   │
│ category_id(FK)─┼───┤                  │
│ instructor_id(FK)   └──────────────────┘
└────────┬────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐
│    Lessons      │
├─────────────────┤
│ id (PK)         │
│ title           │
│ slug            │
│ content         │
│ order           │
│ videoUrl        │
│ course_id (FK)  │
└─────────────────┘


┌──────────────────┐
│   Instructors    │
├──────────────────┤
│ id (PK)          │
│ name             │
│ email            │
│ bio              │
│ avatar           │
│ socialLinks      │
└────────┬─────────┘
         │
         │ 1:N
         ├──────────────────┬──────────────────┐
         │                  │                  │
         ▼                  ▼                  ▼
    Courses           BlogPosts           (otros)
    (N:1)             (N:1)


┌──────────────────────┐
│ ContactSubmissions   │
├──────────────────────┤
│ id (PK)              │
│ name                 │
│ email                │
│ subject              │
│ message              │
│ status               │
│ createdAt            │
└──────────────────────┘
(Sin relaciones)
```

## Tablas SQL

### Categories

```sql
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(255),
  color VARCHAR(7),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Instructors

```sql
CREATE TABLE instructors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  bio TEXT,
  avatar VARCHAR(255),
  social_links JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Courses

```sql
CREATE TABLE courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  description TEXT NOT NULL,
  content LONGTEXT NOT NULL,
  difficulty ENUM('beginner', 'intermediate', 'advanced') NOT NULL,
  duration INT NOT NULL,
  image VARCHAR(255),
  category_id INT NOT NULL,
  instructor_id INT NOT NULL,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
  FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE RESTRICT,
  INDEX idx_slug (slug),
  INDEX idx_category (category_id),
  INDEX idx_instructor (instructor_id)
);
```

### Lessons

```sql
CREATE TABLE lessons (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  content LONGTEXT NOT NULL,
  `order` INT NOT NULL,
  video_url VARCHAR(255),
  duration INT,
  resources JSON,
  course_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  INDEX idx_course (course_id),
  INDEX idx_order (course_id, `order`)
);
```

### BlogPosts

```sql
CREATE TABLE blog_posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) NOT NULL UNIQUE,
  content LONGTEXT NOT NULL,
  excerpt VARCHAR(300) NOT NULL,
  image VARCHAR(255),
  category_id INT NOT NULL,
  author_id INT NOT NULL,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE,
  FOREIGN KEY (author_id) REFERENCES instructors(id) ON DELETE RESTRICT,
  INDEX idx_slug (slug),
  INDEX idx_category (category_id),
  INDEX idx_author (author_id),
  INDEX idx_published (published_at)
);
```

### ContactSubmissions

```sql
CREATE TABLE contact_submissions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  message LONGTEXT NOT NULL,
  status ENUM('pending', 'read', 'resolved') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_created (created_at)
);
```

## Relaciones

| Tabla 1 | Relación | Tabla 2 | Descripción |
|---------|----------|---------|-------------|
| Categories | 1:N | Courses | Una categoría tiene muchos cursos |
| Categories | 1:N | BlogPosts | Una categoría tiene muchos artículos |
| Instructors | 1:N | Courses | Un instructor crea muchos cursos |
| Instructors | 1:N | BlogPosts | Un instructor escribe muchos artículos |
| Courses | 1:N | Lessons | Un curso tiene muchas lecciones |

## Cardinalidad

- 1:N: Una entidad se relaciona con muchas de otra
- N:1: Muchas entidades se relacionan con una
- N:N: Muchas entidades se relacionan con muchas otras (no usado aquí)

## Integridad Referencial

- ON DELETE CASCADE: Si se elimina una categoría, se eliminan sus cursos
- ON DELETE RESTRICT: No se puede eliminar un instructor si tiene cursos

## Índices

Se crean índices en:
- Slugs: Para búsquedas rápidas
- Foreign keys: Para joins eficientes
- Status: Para filtrar por estado
- Fechas: Para ordenar cronológicamente

## Normalización

El esquema está normalizado en 3NF:
- 1NF: Cada columna contiene un valor atómico
- 2NF: Todas las columnas no-clave dependen de la clave primaria
- 3NF: No hay dependencias transitivas entre columnas no-clave
