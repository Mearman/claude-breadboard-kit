/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type {
  BreadboardNode,
  Kit,
  NodeFactory,
  NodeHandlers,
  OptionalIdConfiguration,
} from "@google-labs/breadboard";

import generateCompletion, { GenerateCompletionInputs, GenerateCompletionOutputs } from "./nodes/generate-completion.js";

const coreHandlers = {
  generateCompletion
};

/**
 * Syntactic sugar around the `coreHandlers` library.
 */
export class Claude implements Kit {
  url = "npm:@paulkinlan/claude-breadboard-kit";
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
  ): BreadboardNode<GenerateCompletionInputs, GenerateCompletionOutputs> {
    const { $id, ...rest } = config;
    return this.#nodeFactory.create(this, "generateCompletion", { ...rest }, $id);
  }
}

export type GenerateCompletionNodeType = ReturnType<Claude["generateCompletion"]>;