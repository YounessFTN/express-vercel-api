const express = require("express");
const { PrismaClient } = require("@prisma/client");
const path = require("path");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Route principale
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Routes User
app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: { name, email, password },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { blogs: true },
    });
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: { blogs: true },
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email, password },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Routes Blog
app.post("/blogs", async (req, res) => {
  const { title, content, authorId, published } = req.body;
  try {
    const blog = await prisma.blog.create({
      data: { title, content, authorId: Number(authorId), published },
    });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/blogs", async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      include: { author: true },
    });
    res.json(blogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await prisma.blog.findUnique({
      where: { id: Number(id) },
      include: { author: true },
    });
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, published } = req.body;
  try {
    const blog = await prisma.blog.update({
      where: { id: Number(id) },
      data: { title, content, published },
    });
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.blog.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Blog deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Routes Manga
app.post("/mangas", async (req, res) => {
  const { title, author, description, price, stock } = req.body;
  try {
    const manga = await prisma.manga.create({
      data: {
        title,
        author,
        description,
        price: Number(price),
        stock: Number(stock),
      },
    });
    res.json(manga);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/mangas", async (req, res) => {
  try {
    const mangas = await prisma.manga.findMany();
    res.json(mangas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/mangas/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const manga = await prisma.manga.findUnique({
      where: { id: Number(id) },
    });
    if (manga) {
      res.json(manga);
    } else {
      res.status(404).json({ error: "Manga not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/mangas/:id", async (req, res) => {
  const { id } = req.params;
  const { title, author, description, price, stock } = req.body;
  try {
    const manga = await prisma.manga.update({
      where: { id: Number(id) },
      data: {
        title,
        author,
        description,
        price: Number(price),
        stock: Number(stock),
      },
    });
    res.json(manga);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/mangas/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.manga.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Manga deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Routes Anime
app.post("/animes", async (req, res) => {
  const { title, studio, episodes, description, price, stock } = req.body;
  try {
    const anime = await prisma.anime.create({
      data: {
        title,
        studio,
        episodes: Number(episodes),
        description,
        price: Number(price),
        stock: Number(stock),
      },
    });
    res.json(anime);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/animes", async (req, res) => {
  try {
    const animes = await prisma.anime.findMany();
    res.json(animes);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/animes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const anime = await prisma.anime.findUnique({
      where: { id: Number(id) },
    });
    if (anime) {
      res.json(anime);
    } else {
      res.status(404).json({ error: "Anime not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/animes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, studio, episodes, description, price, stock } = req.body;
  try {
    const anime = await prisma.anime.update({
      where: { id: Number(id) },
      data: {
        title,
        studio,
        episodes: Number(episodes),
        description,
        price: Number(price),
        stock: Number(stock),
      },
    });
    res.json(anime);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete("/animes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.anime.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Anime deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default app;
