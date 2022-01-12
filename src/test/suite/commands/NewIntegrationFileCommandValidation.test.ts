/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

import { expect } from 'chai';
import * as vscode from 'vscode';
import * as NewIntegrationFileCommand from '../../../commands/NewIntegrationFileCommand';


suite('New Apache Camel K integration file - file name validation', function() {
	const workspaceFolder = (vscode.workspace.workspaceFolders as vscode.WorkspaceFolder[])[0];

	test('Message on empty name', async function() {
		expect(await NewIntegrationFileCommand.validateFileName('', 'Java', workspaceFolder)).to.not.be.undefined;
	});

	test('Message on invalid name', async function() {
		expect(await NewIntegrationFileCommand.validateFileName('with a slash/', 'Java', workspaceFolder)).to.not.be.undefined;
	});

	test('Message if file already exists', async function() {
		expect(await NewIntegrationFileCommand.validateFileName('MyRouteBuilder', 'Java', workspaceFolder)).to.not.be.undefined;
	});

	test('No Message on valid name for java', async function() {
		expect(await NewIntegrationFileCommand.validateFileName('Valid', 'Java', workspaceFolder)).to.be.undefined;
	});

	test('No Message on valid name for xml', async function() {
		expect(await NewIntegrationFileCommand.validateFileName('valid', 'xml', workspaceFolder)).to.be.undefined;
	});

	test('Message on invalid Java Convention', async function() {
		expect(await NewIntegrationFileCommand.validateFileName('invalid', 'Java', workspaceFolder)).to.not.be.undefined;
	});
});
