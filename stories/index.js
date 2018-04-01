import React from 'react';
import angular from 'angular';
import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';
import { withConsole } from '@storybook/addon-console';
import AngularBootstrap from './AngularBootstrap';
import something from './something.md';

angular.module('myModule', [])
  .controller('Ctrl', [
    class {
      constructor() {
        this.firstName = '';
      }
      clickme() {
        this.firstName = 'Wagz';
        console.log('clickme() clicked');
      }
    }
  ])
  .component('widget', {
    template: '<button ng-click="$ctrl.onClickHandler()">{{$ctrl.lastname}}</button>',
    controller: class {
      onClickHandler() {
        console.log('onClickHandler() clicked');
      }
    },
    bindings: {
      lastname: '<'
    }
  });

storiesOf('Button', module)
  .addDecorator((storyFn, context) => withConsole()(storyFn)(context))
  .add('with ng-controller', () => (
    <AngularBootstrap
      ngController="Ctrl as vm"
      template={`
        <button ng-click="vm.clickme()">Click Me! {{vm.firstName}}</button>
      `}
      moduleToBootstrap="myModule"
      />
  ))
  .add('with no ng-controller', withNotes(something)(() => (
    <AngularBootstrap
      template={`
        <widget lastname="'mike'"></widget>
      `}
      moduleToBootstrap="myModule"
      />
  )));

