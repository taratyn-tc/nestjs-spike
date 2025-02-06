
# Spikey - A Sample NestJS Application

This repository contains a sample NestJS application that demonstrates solutions to a number of common issues that experienced by teams developing hybrid Web/Event-based (kafka) webapps.

## Problem Statement

We often experience the following issues:

1. We have to spin up new APIs quickly that communicate with both Kafka and Web systems.

Solution: use a libraries that work right out of the box.

KafkaJS is used by Barndoor

TypeORM is one of the oldest ORMs *and* can generate migrations.

2. Different developers have different levels of experience / familiarity / expectations / styles when developing these systems leading inconsistently creating.

Solution: use a framework with strong style guide and organization principles (on top of linting, etc.) - like NestJS.

## Proposed Solution:

Use NestJS with TypeORM and KafkaJS.

## FAQ / How do I ...?

The rest of this document is a faq / catechism of how to resolve particular issues.

### How do I understand how NestJS works?

The [docs for NestJS](https://docs.nestjs.com/first-steps) are freely available and well written. The docs address both new developers and offer deeper technical answers. The docs also include "recipes" for common use cases (see sidebar of docs).

The basic building block of a NestJS application is the [module](https://docs.nestjs.com/modules). A module can:

*import* (depend on) other modules.

*provide* [services](https://docs.nestjs.com/providers#services), [controllers](https://docs.nestjs.com/controllers), clients, and [providers](https://docs.nestjs.com/providers). These may then become interdependent through [dependency injection](https://docs.nestjs.com/providers#dependency-injection).

can *export* services, clients, and providers. This enables other modules possible to import those exports.

An NestJS application contains the main runloop and will delegate requests/messages to *controllers* which can then further delegate responsibilities to *services*.

### How do I quickly create a new module/controler/service?

Nest comes with a [CLI file generator](https://docs.nestjs.com/recipes/crud-generator) to make modules/controllers/service files.

### How do I route my HTTP request to a function to handle it?

Requests are handled by *[controllers](https://docs.nestjs.com/controllers)*.

A controller is a class decorated with an `@Controller` decorator in a file that has the suffix `.controller.ts`. The `@Controller` takes an options object which has a path property, indicating the path the controller serves. The Controller should have methods decorated to indicate the HTTP method the controller's method responds to.

For example:

```typescript
@Controller({path: '/hello'})
export class WebappController {
  constructor(private readonly appService: WebappService) {}

  @Get()
  getHello(@Query('who') who: string = ''): string {
    return this.appService.getHello(who);
  }
}
```

### How do I add a prefix path to all of a module's controllers?

Sometimes we want to re-use a module but prefix all the HTTP paths in that module with a prefix (ex. `/v0`).

The NestJS module [Router Module](https://docs.nestjs.com/recipes/router-module) helps with this.

Example:

```TypeScript
@Module({
  imports: [
    DashboardModule,
    RouterModule.register([
      {
        path: 'dashboard',
        module: DashboardModule,
      },
    ]),
  ],
})
export class AppModule {}
```

In the above example, all the DashboardModule's controllers' paths are prefixed with `dashboard/`

**Important**: see that `DashboardModule` is imported  *directly* and referenced a second time when passed to `RouterModule.register`. Both references are imortant.

### What are these `Dto` suffixes I see on some classes?

A `Dto` suffix is NestJS idiom for designating a class as being [Data Transfer Object](https://en.wikipedia.org/wiki/Data_transfer_object) (DTO).

DTOs are a pattern for providing a class to represent only that aspect of a domain object that is relevant for a particular data transfer.

For example, we might get request with some account query information from a user. That query information may not be enough *in and of itself* to perform our query, we may have to enrich it with other data before we do our query. The user's request would be validated using the DTO and then passed on to a Service which would enrich the query DTO with other information.

Another example, we might have a service returning an Account object. But, our controller is only interested in returning a subset of the Account's properties. The controller can populate a slimmer DTO object with just what's required and return that in the response.

[Validating DTOs](https://docs.nestjs.com/techniques/validation) in NestJS is done using the [Class Validator](https://www.npmjs.com/package/class-validator) library.

### How do I avoid a bloated and brittle controller?

Controllers in NestJS should limit their responsibility to:

Validating and extracting data from a request object (usually using one or more DTOs).
logseq.order-list-type:: number

Preparing data to populate the response (again usually using DTOs).
logseq.order-list-type:: number

All other responsibilities (like talking to the DB) should be delegated to a Service.

If you're writing a Controller that needs to do X, consider *first* writing a Service that does X and then write a controller as the *first* client of that service.

Your HTTP controller may be the first client but a Kafka client's controller may be next!

You may also find that testing your Service is simpler to test.

### How do I write a Kafka consumer with NestJS?

See `src/kafka_main.ts` for a complete example.

NestJS's [microservice](https://docs.nestjs.com/microservices/basics) concept allows a single app to have multiple different interfaces with different protocols (ex. [Kafka](https://docs.nestjs.com/microservices/kafka), [Redis](https://docs.nestjs.com/microservices/redis), [RabbitMQ/AMQ](https://docs.nestjs.com/microservices/rabbitmq#installation), [gRPC](https://docs.nestjs.com/microservices/grpc), and even [custom socket protocols](https://docs.nestjs.com/microservices/custom-transport)).  The term microservice is a little misleading as these are not necessarily different codebases, but different interfaces into the same code base.

Here are some important points:

You need a separate `main` script that is configured with a `Transport.Kafka` config and Kafka client configs (Ex. broker information).

The microservice factory requires a NestJS module to handle the actual app's logic (much like a "regular" NestJS HTTP app has a module that is the root of the app). This module is a regular Nest JS module composed of services, controllers, and other modules.

Kafka module controllers don't get messages routed to them based on http request paths but instead (generally) should have their methods decorated with [`@EventPattern('topicname')`](https://docs.nestjs.com/microservices/kafka#event-based).

It is **particularly** important not to do too much in the Kafka consumer's Controller or on the main thread of a Kafka Consumer. Doing so can affect KafkaJS heart beat which would affect system stability.

### How do I generate/run Database migrations?

Use the `typeorm-ts-node-commonjs` tool provided by [TypeORM](https://typeorm.io).

This repo's `package.json` has run targets `migrations:generate` and `migrations:run` to serve as example.

Note that the current migrations are for SQLite. PostgreSQL migrations will look different (have different SQL).

### How do I run my NestJS app in prod?

First, build the app with

```shell
npx nest build
```

(See `package.json`'s `build` run target).

Second, run the relevant `main.js` file with `node`. Example:

```
node dist/webapp_main.js
```

----

# Original generated README.md

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
