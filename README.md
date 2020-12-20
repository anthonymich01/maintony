# Maintony

Maintony is a Web App for 👓 **Managing Student Assignment**!

## Demo:

[Maintony](https://maintony.anthonyyy.my.id/)

### Demo Account

```bash
username: maintony
password: 123456
```

or. . . You can register a new account yourself!

## Instalation

1. **Clone** this repo
2. **Create & Edit** `.env` file under `maintony/app/`
3. **Type** `NEXT_PUBLIC_BASE_URL=http://localhost:9101`
4. **Change** `http://localhost:9101` to your domain or leave it if you are on local machine
5. **Edit** `maintony/docker-compose.yml`
6. **Find** `JWT_SECRET` under `app: environment`
7. **Change** `I-Love-KFC-Hot-Crispy-Chicken-Bucket-9-Pcs` to your JWT secret key of your choice
8. **Open** terminal and make sure you are in **maintony** dir
9. **Run** `docker-compose up`
10. **Wait** until all containers is up & running
11. **Open** [http://localhost:9101](http://localhost:9101)

## Features

- Add / Remove Students 👪
- Add / Remove Courses 📚
- Assign Students to Courses 🏫
- Students Pagination 🔖
- **_somewhat_** Mobile Friendly 😂
- Database files will be **persisted** in `maintony/db/data/` so you can easily backup / restore your database files

## Stacks

- Node
- Next.JS
- React
- PostgreSQL
- Semantic-UI (CSS Framework)
- Sass
- Multi-container Docker

## Misc

- Auth using **JSON Web Token**
- Server: **Google Cloud Platform**
- Hosted in: **Central USA**
