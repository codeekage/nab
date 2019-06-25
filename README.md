# @codeekage/nab

[![npm (scoped)](https://img.shields.io/badge/nab-v1.2.5-green.svg)](https://github.com/codeekage/nab)


## NAB (Node-web-API-Builder)

NAB is an open source opinionated architectural design for building Node.js Web APIs with an OOP (Object-Oriented Programming) paradigm, and typescript as it’s language. NAB focuses on improving the DX (Developer Experience) when building Node.js Web APIs with Typescript using it’s CLI tool for easy setups. 

### Setting up `nab`

```shelll 
$ npm install -g @codeekage/nab typescript nodemon
```
>  typescript && nodemon can be omitted if already have them installed

```shell // create a new nab-typescript-project

$ nab create --typescript <project-name>
```

This unpacks a basic structured design you need when building a Node.js Web API with typescript. 

NAB takes after the MVC approach for building web applications but excluding the “V” (view). 

NAB is mainly for building Web APIs, and it achieves this by using an “MC”  (Model-Controllers) approach from the MVC architecture. In future, NAB hopes to support a more dynamic structure that’ll also include popular view frameworks. 

Currently, NAB accomplishes its Model-Controllers approach by leveraging technologies like Express, and MongoDB. Where Express acts as it’s controller and MongoDB for its model. 

NAB is not a framework for building Node.js applications, but a structure, a design, or a concept to ease building node.js web APIs with typescript lang.

There’s no magic, or behind the scene events, or APIs, everything that makes up the design, and the concept is available right in the code, making it easy to what you don’t need, and what you really do need. 

NAB further it’s DX (Developer Experience) by providing commands to scaffold models, and controllers when building nodejs web APIs. 

```shell
// create new model
$ nab add model --typescript <model-name>
```

```shell
// create new controller
$ nab add controller --typescript <controller-name>
```

**Start Dev Mode**

```shell
$ nab start --typescript dev
```

**More Options**

```
$ nab --help
```





