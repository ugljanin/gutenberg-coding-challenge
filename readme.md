# Welcome to the XWP Gutenberg Coding Challenge!

We are really happy that you decided to apply to XWP!

As part of the hiring process, we are trying to evaluate your technical skills and work experience.
The Gutenberg Coding Challenge you are about to take is part of this process.

This repository contains a custom Gutenberg block called "Country Card".
It allows selecting a country from a list and displaying basic information about it.
If the selected country name occurs in other posts on the site,
the titles and excerpts of those posts will be listed in the card footer (as a static list).

![Country Card Block](screenshot.jpg?raw=true)

## The problem

Unfortunately, the block was not coded very well.
Apart from violating various WordPress coding standards, the code in general is pretty buggy.

## Your task

**Your task is to fix all the issues you encounter.**

We want to have a plugin that follows best practices and renders semantic and clean markup.
On the frontend, the block should look similarly to the one in the screenshot attached.

It is okay for the related posts in the card footer to be static when viewed on the frontend.
In this version of the block, we are not looking into making the posts list dynamic.

The Country Card Block has not been used so far on any site,
so you do not have to worry about block deprecation.

You are free to install additional dependencies, if needed.

Push your changes to a new feature branch in this repo.
Once you are done, issue a pull request against the `main` branch.
Next, let us know that your PR is ready for review.

We will be reviewing your work as a whole so please pay attention to the process you follow.

The coding challenge should take up to **2 hours**.

**Good luck!**

---

# Country Card Block Plugin

A WordPress block rendering a card with country information.

To test, add the "Country Card" block in the block editor.

## Requirements

* [NVM](https://github.com/creationix/nvm/) - to install the correct [Node.js](https://nodejs.org/en/) version.
* [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) - to install Javascript dependencies.

### Local environment

Since you need a WordPress environment to run the plugin, the quickest way to get up and running is to use the bundled `wp-env` environment.

`wp-env` requires Docker to be installed. There are instructions available for installing Docker on [Windows 10 Pro](https://docs.docker.com/docker-for-windows/install/), [all other versions of Windows](https://docs.docker.com/toolbox/toolbox_install_windows/), [macOS](https://docs.docker.com/docker-for-mac/install/), and [Linux](https://docs.docker.com/v17.12/install/linux/docker-ce/ubuntu/#install-using-the-convenience-script).

## Installation

Clone this repository to you local computer, `cd` to this directory and install the required version of Node and NPM dependencies:

```sh
nvm install
npm install
```

Then, start the local environment

```sh
npm run env start
```

Finally, run the build process in a watch mode:

```sh
npm start
```

Now, you can access the site with the Country Card Block plugin installed and activated:

http://localhost:8888 (Username: `admin`, Password: `password`)

In order to stop the Docker containers run:

```sh
npm run env stop
```
