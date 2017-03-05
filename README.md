![Gitlogg API](https://raw.githubusercontent.com/dreamyguy/gitlogg-api/master/docs/gitlogg-api-icon-github_wide.png "API for Gitlogg, so that one can retrieve 'git log' data from one or more repositories in relevant chunks")

> _API for the data provided by [Gitlogg][4], so that one can retrieve `git log` data from one or more repositories in relevant chunks._

[**Gitlogg**][4] sanitises the `git log` and outputs it to `JSON`, a format that can easily be consumed by other applications. As long as the repositories being scanned are kept up to date, [**Gitlogg**][4] will return fresh data every time it runs.

**Gitlogg API** was designed solely to distribute the `git log` data already parsed by [**Gitlogg**][4]. Therefore it only makes sense to use it if you've already got the data parsed to `JSON` but need a middleware to crunch the data into smaller, meaningful chunks also in `JSON` format. From there one can build more complex applications to visualise the data.

**Gitlogg API** consists not only of a server and a database with data endpoints, but also features some views that will give you a very basic glance over the data.

## Getting started

**Gitlogg API** requires [NodeJS][2] and [MongoDB][3].

To get started, follow these steps, in this order:

1. Place the parsed `gitlogg.json` file, which is the output of [**Gitlogg**][4], at the root of the project. This is the 1st step because Without it, there's no point initialising the API.
2. Install `NodeJS` (visit [their page][2] to find the right install for your system).
3. Install `MongoDB` (visit [their page][3] to find the right install for your system).
4. On the 1st terminal window, run `mongod`. That will initialise MongoDB. More details on MongoDB processes [here](https://docs.mongodb.com/manual/tutorial/manage-mongodb-processes/).
5. On the 2nd terminal window, navigate to where you've cloned this project and run `npm install`. That will install all dependencies.
6. On the same window, run `npm run import`. That will create a new collection on the `mongo`database and import the data within `gitlogg.json` into it.
7. On the same window, run `gulp`. That will compile static files and initialise the server with live-reload.

Optional: On a new terminal window, run `mongo`. That will open you a [shell from which you can query and update data as well as perform administrate operations](https://docs.mongodb.com/manual/mongo/). This step is not necessary but the shell can help you debug problems with the database.

## The API interface

The API interface is fully dynamic and based on currently available datapoints. It currently looks like this:

![Gitlogg API interface](https://raw.githubusercontent.com/dreamyguy/gitlogg-api/master/docs/gitlogg-api_interface.png "Gitlogg API interface")

> **Please DO NOTE** that since this API is based on the data outputted by [**Gitlogg**][4], the datapoints are intrinsically connected to the structure and the naming convention of that data!

I'll refrain from posting all the datapoints in _this_ README file, but some examples are in order. For a full overview, initialise the API and visit `http://localhost:7000/api`.

### Global Operations

Get ALL commits

    /api/all

Get global stats

    /api/stats

Get repositories stats

    /api/stats/repositories

Get authors stats

    /api/stats/authors

### Repositories Operations (similar 'Author Operations' are available as well)

Get repositories, by commit count

    /api/repositories/commit-count

Get repositories, by impact

    /api/repositories/impact

Get repositories, by impact ratio

    /api/repositories/impact-ratio

Get repositories, by days since last commit

    /api/repositories/days-since-last-commit

Get repositories, by staleness

    /api/repositories/staleness

Get repositories, by days active

    /api/repositories/days-active

Get repositories, by number of contributors

    /api/repositories/contributors-nr

### Equal Values Operations

Get all commits with same repository

    /api/repository/:repository

Get all commits with same commit_nr

    /api/commit_nr/:commit_nr

Get all commits with same commit_hash

    /api/commit_hash/:commit_hash

Get all commits with same author_name

    /api/author_name/:author_name

Get all commits with same author_email

    /api/author_email/:author_email

...and some others.

## Further Notes

#### Debugging

Post an issue with a link to a _gist_ containing your error and I will try to reproduce it.

#### Documentation

The heart of the API's documentation will always be at the `/api` URL. There one will find all the available data endpoints and or a guide on how to use it dynamically.

Further "development" documentation is otherwise provided through:

* Commit messages,
* Commit comments,
* Code comments,
* `README.md` files, like this one.

Some of the initial commits were done deliberately to show what it took to put this application together. From that point on commits keep on introducing simplicity or complexity to the code, depending on the work flow. That in itself is a form of documentation. In other words, if you're really that interested in details, there are plenty to be had in the code itself and in its own progressive enhancement.

#### License

[MIT](LICENSE)

#### Disclaimer

This project is by no means the smartest way to build an API, nor does it aim at becoming so. It is simply a _learn-by-doing_ project in which I experiment with whatever I find along the way.

Both [**Gitlogg**][4] and **Gitlogg API** were built and tested on OSX/macOS. Though an effort has been done to make it cross-platform, there could be errors on other systems.

[**Gitlogg**][4] is certainly not harmful to your repositories and it won't change any data in it.
**Gitlogg API** is self-contained and is not supposed to affect any other application or process in your machine.

Having said that, they're served _raw_ and _'as is'_. You may get support, but don't expect it nor take it for granted.

#### Known Issues

* No caching, _yet_. Depending of the size of your data, the API will load, but with a lot of lag.
* There are no tests at the moment, so some of the helper functions may not fully work as they are expected to.

None of these issues are detrimental to the functionality of the current API at the time of this writing, AFAIK.

#### Release History

No release yet at this point.

-------------

> _Brought to you by [Wallace Sidhrée][1]._

  [1]: http://sidhree.com/ "Wallace Sidhrée"
  [2]: https://nodejs.org/en/ "NodeJS"
  [3]: https://www.mongodb.com/ "MongoDB"
  [4]: https://github.com/dreamyguy/gitlogg "Gitlogg"
