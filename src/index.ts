/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  NodeHandlers
} from "@google-labs/graph-runner";
import type {
  BreadboardNode,
  Kit,
  NodeFactory,
  OptionalIdConfiguration,
} from "@google-labs/breadboard";

import generateCompletion from "./nodes/generate-completion.js";
import generateEmbedding from "./nodes/generate-embedding.js";


const coreHandlers = {
  generateCompletion,
  generateEmbedding
};

/**
 * Syntactic sugar around the `coreHandlers` library.
 */
export class OpenAI implements Kit {
  url = "npm:@paulkinlan/openai-breadboard-kit";
  #nodeFactory: NodeFactory;
  #handlers: NodeHandlers;

  get handlers() {
    return this.#handlers;
  }

  constructor(nodeFactory: NodeFactory) {
    this.#nodeFactory = nodeFactory;
    this.#handlers = coreHandlers;
  }

  generateCompletion(
    config: OptionalIdConfiguration = {}
  ): BreadboardNode {
    const { $id, ...rest } = config;
    return this.#nodeFactory("generateCompletion", { ...rest }, $id);
  }

  generateEmbedding(
    config: OptionalIdConfiguration = {}
  ): BreadboardNode {
    const { $id, ...rest } = config;
    return this.#nodeFactory("generateEmbedding", { ...rest }, $id);
  }
}

export type GenerateCompletionNodeType = ReturnType<OpenAI["generateCompletion"]>;
export type GenerateEmbeddingNodeType = ReturnType<OpenAI["generateEmbedding"]>;
