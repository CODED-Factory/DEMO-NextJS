# Next.js

[Slides](https://docs.google.com/presentation/d/1f4rTPjVXGtefW04qkcVll0mcfhuao2LrrsrCcb9S-DM/edit?usp=sharing)  
[Next.js Documentation](https://nextjs.org/docs/getting-started)

[Part 1 Recording](https://youtu.be/Uch_P8gL3Ng)  
[Part 2 Recording](https://youtu.be/Wxgzb1_5fHs)

## Setup

1. Create a next app:

   ```bash
   $ yarn create next-app
   ```

2. Run the server:

   ```bash
   $ yarn build && yarn start
   ```

3. Run in development mode for hot-reloading (SSG will revert to SSR):

   ```bash
   $ yarn dev
   ```

4. Explore `pages/index.js`:

   - a simple component
   - importing css modules
   - modifying `Head`
   - accessing static content from `public`

---

## Pages - Routing basics

Any file in `pages` is considered a page:

1. The name of the file is the url - `pages/posts.js` will be served to `/posts`
2. `index.js` will be server to `/`
3. Files in `pages` have to export a react component

   `pages/posts.js`

   ```jsx
   export default function Posts() {
     return <div>POSTS PAGE!</div>;
   }
   ```

4. `Link` components from `next/link` can be used to navigate between pages.
   **Important**: The `href` is the path to the **file** in `/pages` **not** the url

`index.js`

```jsx
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/posts">Posts</Link>
    </div>
  );
}
```

5. Content that should be included on every page (e.g. providers, context, themes, bootstrap, etc) should go in `_app.js`

   `_app.js`

   ```jsx
   import "bootstrap/dist/css/bootstrap.min.css";

   function MyApp({ Component, pageProps }) {
     return (
       <>
         <p>
           <Link href="/">
             <a>pretend</a>
           </Link>{" "}
           I'm a navbar with a{" "}
           <Link href="/posts">
             <a>link to posts</a>
           </Link>
         </p>
         <Component {...pageProps} />
       </>
     );
   }
   ```

   `index.js`

   ```jsx
   return (
     <Link href="/posts">
       <div className="btn btn-primary">Posts</div>
     </Link>
   );
   ```

6. Nested files and folders create compound routes:

   ```
   | - pages
     | - index.js
     | - test.js
     | - posts
         | - index.js
         | - 1.js
         | - 2.js
     | - hello
         | - hi
             | - index.js
             | - greeting.js
         | - how-are-you.js
   ```

   will server pages at the following urls:

   - `/`
   - `/test`
   - `/posts`
   - `/posts/1`
   - `/posts/2`
   - `/hello`
   - `/hello/hi`
   - `/hello/hi/greeting`
   - `/hello/how-are-you`

   (Notice that there **isn't** a page at `/hello` because there isn't a `pages/hello/index.js`)

   `pages/posts/index.js`

   ```jsx
   <div>
     <h1>Posts Page</h1>
     <div className="row">
       <div className="col-3">
         <Link href="/posts/1">
           <div type="button" className="card m-5">
             <div className="card-body">
               <h5 className="card-title">Post 1</h5>
             </div>
           </div>
         </Link>
       </div>
     </div>
   </div>
   ```

---

## Dynamic Routing

Manually naming our pages isn't always an option.  
What if we have pages based on dynamic data?

1. Files and folders in `pages` that have square brackets in the name (e.g. `[param].js` are considered dynamic.
   The parameter can be accessed use the `useRouter` hook.

   `/pages/posts/[slug].js`

   ```jsx
   import { useRouter } from "next/router";

   export default function Post() {
     const { slug } = useRouter().query;
     return <h1>I AM POST {slug}</h1>;
   }
   ```

2. When using a `Link` to navigate to a dynamic route, we need a combination of `href` and `as`:

   `/pages/posts/index.js`

   ```jsx
   // Data
   const posts = [...]; //[{title, content, slug}]

   export default function Posts() {
     const postCards = posts.map((post) => (
       <div key={post.slug} className="col-3">
         <Link href="/posts/[slug]" as={`/posts/${post.slug}`}>
           <div type="button" className="card m-5">
             <div className="card-body">
               <h5 className="card-title">{post.title}</h5>
             </div>
           </div>
         </Link>
       </div>
     ));

     return (
       <div>
         <h1>Posts Page</h1>
         <div className="row">{postCards}</div>
       </div>
     );
   }
   ```

---

# Data Fetching in Next.js

Next.js attempts to optimize the pre-rendering of the pages being served as much as possible.  
If the contents of a page are completely static, it will be served as pure HTML.  
Next.js will render as much of the page into pure HTML on the server side.  
Any interactive components on the page will be _hydrated_ on the client side after the accompanying JS loads.

When it comes to fetching data in Next.js there are three different strategies that can be adopted depending on your needs.

## Client Side Rendering (CSR)

This is the standard way most react apps render data. After the page is served and after the JS loads, the client (the user's browser)
will make the request to fetch the data and hydrate the page. This means the data will be re-requested every time the page is refreshed.

You would use CSR in cases where the data cannot be pre-fetched and is highly dependent on some context on the client-side (like user credentials).  
Dashboards, personal calendars, and shopping carts are some examples of the kinds of pages that require CSR.

To use CSR in Next.js the page (or one of its sub components) need to fetch the data.

(Switch to the `data-fetching-csr` branch if you want to see an example.)

`pages/bootcamps/index.js`

```jsx
import { useState, useEffect } from "react";
import axios from "axios";

// Components
import BootcampList from "../../components/BootcampList";

export default function Bootcamps() {
  const [bootcamps, setBootcamps] = useState([]);

  const fetchBootcamps = async () => {
    const { data } = await axios.get("http://localhost:3001/bootcamps");
    setBootcamps(data);
  };

  useEffect(() => {
    fetchBootcamps();
  }, []);

  return <BootcampList bootcamps={bootcamps} />;
}
```

`pages/bootcamps/[id].js`

```jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Error from "next/error";

// Components
import BootcampDetail from "../../components/BootcampDetail";

export default function Bootcamp() {
  const { id } = useRouter().query;
  const [bootcamp, setBootcamp] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBootcamp = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/bootcamps/${id}`);
      setBootcamp(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchBootcamp();
  }, [id]);

  if (loading) return <h1>Loading...</h1>;

  if (!bootcamp) return <Error statusCode={404} />;

  return <BootcampDetail bootcamp={bootcamp} />;
}
```

## Server Side Rendering (SSR)

In server side rendering, the data is fetched on the server, on every request, before the HTML file is served. The client doesn't have to make any requests for the data because the page will load with the data already provided. The page will be fully rendered on the server. The data will be re-requested and the page re-rendered on the server every time the page is refreshed.

You should only use SSR in cases where the data might change between requests and can be fetched independent of the client but it's important for it to be pre-rendered. For example, pre-rendering a shop's public inventory for SEO purposes.

To use SSR in Next.js the page would need to export a `getServerSideProps` function. This functions runs on the server every time the page is requested.

(Switch to the `data-fetching-ssr` branch if you want to see an example.)

`pages/bootcamps/index.js`

```jsx
import axios from "axios";

// Components
import BootcampList from "../../components/BootcampList";

export default function Bootcamps({ bootcamps }) {
  return <BootcampList bootcamps={bootcamps} />;
}

export async function getServerSideProps() {
  const { data } = await axios.get("http://localhost:3001/bootcamps");

  return {
    props: {
      bootcamps: data,
    },
  };
}
```

You can access the parameter in a dynamic route through the `context.params` passed to the `getServerSideProps` function.

`pages/bootcamps/[id].js`

```jsx
import axios from "axios";
import Error from "next/error";

// Components
import BootcampDetail from "../../components/BootcampDetail";

export default function Bootcamp({ bootcamp }) {
  if (!bootcamp) return <Error statusCode={404} />;
  return <BootcampDetail bootcamp={bootcamp} />;
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  let bootcamp;

  try {
    const { data } = await axios.get(`http://localhost:3001/bootcamps/${id}`);
    bootcamp = data;
  } catch (error) {
    console.error(error.message);
  }

  return { props: { bootcamp } };
}
```

## Static Site Generation (SSG)

Static site generation means that the data is fetched **once** during build time. During the build, Next.js will pre-render the page and generate an HTML file. The client doesn't have to make any requests for the data because the page will load with the data already provided. The page will be fully rendered on the server. The data will not be re-requested even if the client refreshes the page. The state of the content will remain static to when the page was initially built. All users will be served the exact same HTML file. You would need to rebuild the page to show changes to the data.

You should use SSG in cases where the data is public, stable, and will be updated infrequently. Blog posts, shop locations, and courses, are some examples where SSG can be used.

To use SSG in Next.js the page would need to export a `getStaticProps` function. This function runs once at build time.

(Switch to the `data-fetching-ssg` branch if you want to see an example.)

`pages/bootcamps/index.js`

```jsx
import axios from "axios";

// Components
import BootcampList from "../../components/BootcampList";

export default function Bootcamps({ bootcamps }) {
  return <BootcampList bootcamps={bootcamps} />;
}

export async function getStaticProps() {
  const { data } = await axios.get("http://localhost:3001/bootcamps");

  return {
    props: {
      bootcamps: data,
    },
  };
}
```

To use SSG with dynamic routes, you would also need to export `getStaticPaths` from the page. This function runs once during the initial build and will generate a static page for each element in the array returned in the `paths` key. The array should have a format similar to `[{ params: { <PARAM_NAME>: <PARAM_VALUE> }}]` where the `<PARAM_NAME>` should match the parameter in the page file name (e.g. `/pages/bootcamps/[id].js` expectes an array like `[{ params: { id: 1 }}]`).

`pages/bootcamps/[id].js`

```jsx
import axios from "axios";
import Error from "next/error";

// Components
import BootcampDetail from "../../components/BootcampDetail";

export default function Bootcamp({ bootcamp }) {
  if (!bootcamp) return <Error statusCode={404} />;
  return <BootcampDetail bootcamp={bootcamp} />;
}

export async function getStaticPaths() {
  const { data } = await axios.get("http://localhost:3001/bootcamps/ids");
  const paths = data.map((id) => ({ params: { id } }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { data } = await axios.get(
    `http://localhost:3001/bootcamps/${params.id}`
  );

  return { props: { bootcamp: data } };
}
```
