# Working with the Carolina Cartography webiste

We've set up this project to have as small as a learning curve as possible. The site is primarily composed of basic HTML, CSS and Javascript, so that members of the team can dive into development with as few barriers as possible. The introduction of a blog (or list of projects), however, requires that we use PHP to make lists and repeated content easier to work with.

## Getting Started

This guide assumes some familiarity with the basic web languages already mentioned: HTML, CSS and Javascript. PHP is a server-side language that dynamically generates HTML when requests are received from the browser. Because of this "generation" step, working with PHP locally requires you to set up a basic web server.

### Installation (for Mac)

We'll need to install the following tools:
1. Homebrew - a basic package manager (app store) for Mac OS X
2. Apache (httpd) - a web server (listens to requests, returns content)
3. PHP - the handler for our PHP files, which runs alongside Apache

Install Homebrew with the following:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

Once you have Homebrew, install Apache and PHP with the following:
```bash
brew install httpd
brew install php
```

### Setup
First, we'll stop the system version of Apache (if you get an error, ignore it):
```bash
sudo apachectl stop
sudo launchctl unload -w /Systems/Library/LaunchDaemons/org.apache.httpd.plist
```

Next, we'll start the Apache version we just installed using Homebrew, as well as PHP:
```bash
brew services start httpd
sudo apachectl start
brew services start php
```

Next, we'll want to decide which folder Apache should look for our websites. I suggest creating a folder call `dev` in your user folder, which is the folder that you find yourself in when you start Terminal, and is accesible using the `cd ~` command. I like to put all my Git repositories in this folder so I know where to find them.

Once the `~/dev` folder is set up, we'll want to configure Apache.

0. Run `whoami` so you know your username.
1. Run `nano /usr/local/etc/httpd/httpd.conf`. This will open a text editor, which you can navigate through using your arrow keys.
2. Find the "Listen" section, and change `Listen 8080` to `Listen 80`. The default port used by the browser for unencrypted traffic is port 80, so we'll want to use that to make things easy.
3. Next, you'll see a list of "LoadModule" statements. At the bottom of this, do the following:
  - Uncomment (remove the `#`) the line with `rewrite_module`
  - Add the following line below it: `LoadModule php7_module /usr/local/opt/php/lib/httpd/modules/libphp7.so` - this enables PHP
4. Next, you'll see `User` and `Group` settings. Change User to your username (from step 0) and Group to `staff`
5. Further down, change the `ServerName` value to `localhost:80`
6. Next, you'll find `DocumentRoot` - change what's in the quotes to `/Users/username/dev` (where username is _your username_), and enter the same text in the quote in the `<Directory "">` line below. In this Directory block, change `AllowOverride` to `All`
7. Below this, you'll see "DirectoryIndex". Add a space and `index.php` to the line that says `DirectoryIndex index.html`
8. Beneath the "DirectoryIndex" section (after the line `</IfModule>`), paste the following:
```
<FilesMatch \.php$>
SetHandler application/x-httpd-php
</FilesMatch>
```

You're all set. Save the file in Nano by pressing Control+X, then Y, then Enter.

Finally, restart Apache to make your changes take effect:
```bash
sudo apachectl restart
```

Let's create a file in `~/dev` called `index.html` with the text "It works!".

Now, visit http://localhost/ - you should see "It works!".

### Understanding PHP vs. HTML
You can rename any file ending in .html to .php, and as long as you access the file from `localhost` instead of directly from the filesystem, it will get loaded just like HTML.

"Accessing from localhost" means that if you have a file like `/Users/tomasroy/dev/cartography/website/blog.php`, you'll want to visit `http://localhost/cartography/website/blog.php` instead of `file:///Users/tomasroy/dev/cartography/website/index.html` like you would before setting up Apache/PHP. Notice these are similar, except `localhost` has replaced `/Users/tomasroy/dev` (which is what we used as our `DocumentRoot`).

### That's it!

You can now think of files like `index.php` just like `index.html`.

## Working with PHP

If you're coming from an HTML background, getting started with PHP is simple. An `.html` file can be renamed to `.php` and work exactly the same, which is why I went with PHP for this project. Folks that are familiar with the HTML syntax can continue to use HTML as they usually would and ignore what's going on behind the scenes.

### Why use PHP?

For our purposes, PHP is important for two reasons:
1. We can include the same code on multiple pages using PHP's `include()` functionality
2. We can display a list of pages, (in our case, blog articles), without having to manually maintain a list that's separate from the article files themsevles.