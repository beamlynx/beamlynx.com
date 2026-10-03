# Homepage screenshots

`app-<theme>.webp` (1360×800), `app-<theme>@2x.webp` and `app-<theme>-crop.webp` (phones) are real screenshots of beamlynx-ui. `../og-image.png` is the social preview built from the dark one.

They show pine-lang's sample shop database, never a real one.

## Retaking them

1. In `pine-lang`, start the sample database: `docker compose -f dev.docker-compose.yml up -d dev-db-postgres` (port 5435).
2. Start a Pine server on port 33333. The bundled one works: `PINE_PORT=33333 beamlynx-desktop/resources/server/pine-server/bin/pine-server`.
3. In `beamlynx-ui`, run `next dev` and open it in a fresh browser profile at 1360×800, device scale 2.
4. Add the connection `localhost:5435`, user `pine`, password `pine`, database `pine`.
5. Set the theme (localStorage key `pine-theme`: `"dark"`, `"light"` or `"sepia"`), then run:

   ```
   customers
   | select: first_name
   | public.orders .customer_id
   | select: order_number, status
   | public.product_reviews .order_id
   | select: rating, title
   ```

6. Hide the **DEV** chip and the version label, which only dev builds show.
7. Convert with ImageMagick:

   ```
   magick shot.png -quality 82 app-dark@2x.webp
   magick shot.png -resize 50% -quality 84 app-dark.webp
   magick shot.png -crop 1320x1440+0+170 +repage -resize 900x -quality 82 app-dark-crop.webp
   ```

The homepage demo's data (`src/components/home/demoSteps.ts`) comes from the same server: each step is the result of `POST /api/v1/build` and `POST /api/v1/eval` for that step's expression.
