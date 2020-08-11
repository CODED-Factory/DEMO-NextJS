# Next.js

[Slides](https://docs.google.com/presentation/d/1f4rTPjVXGtefW04qkcVll0mcfhuao2LrrsrCcb9S-DM/edit?usp=sharing)

<!-- [Recording](https://youtu.be/MNHc0j8PDnE) -->

### Setup

1. Create a next app:

   ```bash
   $ yarn create next-app
   ```

2. Run the server:

   ```bash
   $ yarn build && yarn start
   ```

3. Run in development mode for hot-reloading:

   ```bash
   $ yarn dev
   ```

4. Explore `pages/index.js`:

   - a simple component
   - importing css modules
   - modifying `Head`
   - accessing static content from `public`

### Pages - Routing basics

1. Any file in `pages` is considered a page:

   - The name of the file is the url
   - `index.js` maps to `/`
   - page files have to export a react component

2. Create a `hello.js` file. Show it in the browser.

   ```jsx
   export default function Hello() {
     return <div>HELLO WORLD!</div>;
   }
   ```

3. Make a `bootcamps.js` page

   ```jsx
   export default function Bootcamps() {
     return (
       <div>
         <h1>All the bootcamps</h1>
       </div>
     );
   }
   ```

4. Use a `Link` in `index.js` to go to `/bootcamps`:

   `index.js`

   ```jsx
   import Link from "next/link";

   export default function Home() {
     return (
       <div>
         <Link href="/bootcamps">Bootcamps</Link>
       </div>
     );
   }
   ```

5. Content that should be included on every page (e.g. bootstrap, navbars, footers etc) should go in `_app.js`

   Install Bootstrap:

   ```bash
   $ yarn add bootstrap
   ```

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
           <Link href="/bootcamps">
             <a>link to bootcamps</a>
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
     <Link href="/bootcamps">
       <div className="btn btn-primary">Bootcamps</div>
     </Link>
   );
   ```

6. Create a subroute `/bootcamps/1`:

   - move `bootcamps.js` to `bootcamps/index.js`
   - create `1.js`
   - Link them together

   `bootcamps/index.js`

   ```jsx
   <div>
     <h1>All the bootcamps</h1>
     <div className="row">
       <div className="col-3">
         <Link href="/bootcamps/1">
           <div type="button" className="card m-5">
             <div className="card-body">
               <h5 className="card-title">Bootcamp 1</h5>
             </div>
           </div>
         </Link>
       </div>
     </div>
   </div>
   ```

### Dynamic Routing

7. Add a data file

8. Import `bootcamps` and loop to create multiple cards:

   `bootcamps/index.js`

   ```jsx
   // Data
   import bootcamps from "../../data";

   export default function Bootcamps() {
     const bootcampCards = bootcamps.map((bootcamp) => (
       <div key={bootcamp.name} className="col-3">
         <Link href={`/bootcamps/${bootcamp.id}`}>
           <div type="button" className="card m-5">
             <img
               src={bootcamp.image}
               style={{ backgroundColor: "black" }}
               alt=""
               className="card-img-top"
             />
             <div className="card-body">
               <h5 className="card-title">{bootcamp.name}</h5>
             </div>
           </div>
         </Link>
       </div>
     ));
     return (
       <div>
         <h1>All the bootcamps</h1>
         <div className="row">{bootcampCards}</div>
       </div>
     );
   }
   ```

9. Turn `1.js` into a dynamic route `[id].js` and pull the `id` from the `query`

   `[id].js`

   ```jsx
   import { useRouter } from "next/router";

   export default function Bootcamp() {
     const { id } = useRouter().query;
     return <h1>I AM BOOTCMAP {id}</h1>;
   }
   ```

10. Make `bootcamps/[id].js` more interesting

    ```jsx
    export default function BootcampOne() {
    const { id } = useRouter().query;

    const bootcamp = bootcamps.find((bootcamp) => bootcamp.id === id);

    if (!bootcamp && !id) return <h1>Loading...</h1>;

    const cohortCards = bootcamp.cohorts.map((cohort) => (
       <div className="col-3">
          <div key={cohort.id} className="card">
          <div className="card-body">
             <h5 className="card-title">{cohort.name}</h5>
             <p className="card-text">{cohort.startDate}</p>
          </div>
          <ul className="list-group list-group-flush">
             {cohort.instructors.map((instructor) => (
                <li
                key={instructor.name}
                className="list-group-item d-flex justify-content-between align-items-center"
                >
                {instructor.name}
                <div
                   src={instructor.image}
                   style={{
                      height: 50,
                      width: 50,
                      backgroundImage: `url(${instructor.image})`,
                      backgroundSize: "cover",
                      borderRadius: "50%",
                   }}
                />
                </li>
             ))}
          </ul>
          </div>
       </div>
    ));

    return (
       <>
          <div
          className="jumbotron jumbotron-fluid"
          style={{ backgroundColor: "black", color: "white" }}
          >
          <div className="container">
             <img src={bootcamp.image} alt="" />
          </div>
          </div>
          <div className="container row pb-5">{cohortCards}</div>
       </>
    );
    ```

### Fetching Data

1. Add a API

```

```

```

```
