describe('Todo MVC test', () => {
    const user = cy;
    const todo = 'todo' + Math.floor((Math.random() * 10000) + 1);
    const todo2 = 'todo2' + Math.floor((Math.random() * 10000) + 1);
  
    it('Check Ability to access to BackboneJS Todo MVC', () => {
        user.log('Visit to BackboneJS Todo MVC');
        user.visit('/examples/backbone/');

        user.log('Check if header text is displayed');
        user.contains('h1', 'todos').should('be.visible');
    });

    it('Check placeholder text in New Todo textbox', () => {
        user.log('Visit to BackboneJS Todo MVC');
        user.visit('/examples/backbone/');

        user.log('Check if header text is displayed');
        user.get('.new-todo').invoke('prop', 'placeholder').should('eq', 'What needs to be done?');
    });
    
    it('Check Ability to create new todo', () => {
        user.log('Visit to BackboneJS Todo MVC');
        user.visit('/examples/backbone/');

        user.log('Create new todo');
        user.get('.new-todo').type(todo + '{enter}');

        user.log('Verify new todo is presented in the list');
        user.contains('label', todo).should('be.visible');

        user.log('Verify new todo has status unchecked');
        user.contains('li', todo).find('.toggle').then(_toggle => {
            cy.wrap(_toggle).should('not.be.checked');
        });
    });

    it('Check Ability to complete/uncomplete a todo', () => {
        user.log('Visit to BackboneJS Todo MVC');
        user.visit('/examples/backbone/');

        user.log('Create new todo');
        user.get('.new-todo').type(todo + '{enter}');

        user.log('Verify new todo is presented in the list');
        user.contains('label', todo).should('be.visible');

        user.log('Check the todo task to mark it as completed');
        user.contains('li', todo).find('.toggle').then(_toggle => {
            cy.wrap(_toggle).check();
        });

        user.log('Verify new todo has status checked');
        user.contains('li', todo).find('.toggle').then(_toggle => {
            cy.wrap(_toggle).should('be.checked');
        });

        user.log('Uncheck the todo task to mark it as incompleted');
        user.contains('li', todo).find('.toggle').then(_toggle => {
            cy.wrap(_toggle).uncheck();
        });

        user.log('Verify new todo has status unchecked');
        user.contains('li', todo).find('.toggle').then(_toggle => {
            cy.wrap(_toggle).should('not.be.checked');
        });
    });

    it('Check if user can filter by todo task status', () => {
        user.log('Visit to BackboneJS Todo MVC');
        user.visit('/examples/backbone/');

        user.log('Create new todo');
        user.get('.new-todo').type(todo + '{enter}');

        user.log('Verify new todo is presented in the list');
        user.contains('label', todo).should('be.visible');

        user.log('Create another todo');
        user.get('.new-todo').type(todo2 + '{enter}');

        user.log('Verify new todo is presented in the list');
        user.contains('label', todo2).should('be.visible');

        user.log('Check the todo task to mark it as completed');
        user.contains('li', todo).find('.toggle').then(_toggle => {
            cy.wrap(_toggle).check();
        });

        user.log('Filter by active');
        user.contains('.footer a', 'Active').click();

        user.log('Verify new url is updated');
        user.url().should('eq', 'http://todomvc.com/examples/backbone/#/active')

        user.log('Check the list that it is filtered and no completed todo presented');
        user.get('li:not(.hidden) input.toggle').each(_el => {
            cy.wrap(_el).should('not.be.checked');
        });

        user.log('Filter by Completed');
        user.contains('.footer a', 'Completed').click();

        user.log('Verify new url is updated');
        user.url().should('eq', 'http://todomvc.com/examples/backbone/#/completed')

        user.log('Check the list that it is filtered and no completed todo presented');
        user.get('li:not(.hidden) input.toggle').each(_el => {
            cy.wrap(_el).should('be.checked');
        });
    });

    it('Check Ability to clear completed todo', () => {
        user.log('Visit to BackboneJS Todo MVC');
        user.visit('/examples/backbone/');

        user.log('Create new todo');
        user.get('.new-todo').type(todo + '{enter}');

        user.log('Verify new todo is presented in the list');
        user.contains('label', todo).should('be.visible');

        user.log('Check the todo task to mark it as completed');
        user.contains('li', todo).find('.toggle').then(_toggle => {
            cy.wrap(_toggle).check();
        });

        user.log('CLick Clear Complete button');
        user.get('.clear-completed').click();

        user.log('Verify completed todo is cleared');
        user.contains('li', todo).should('not.be.visible');
    });

    it('Check Ability to completed all todos', () => {
        user.log('Visit to BackboneJS Todo MVC');
        user.visit('/examples/backbone/');

        user.log('Create new todo');
        user.get('.new-todo').type(todo + '{enter}');

        user.log('Verify new todo is presented in the list');
        user.contains('label', todo).should('be.visible');

        user.log('Create another todo');
        user.get('.new-todo').type(todo2 + '{enter}');

        user.log('Verify new todo is presented in the list');
        user.contains('label', todo2).should('be.visible');

        user.log('Click Toggle all button to complete all todos');
        user.get('[for="toggle-all"]').click();

        user.log('Check the list that all todos have been completed');
        user.get('li:not(.hidden) input.toggle').each(_el => {
            cy.wrap(_el).should('be.checked');
        });
    });

    it('Check if user can delete a todo', () => {
        user.log('Visit to BackboneJS Todo MVC');
        user.visit('/examples/backbone/');

        user.log('Create new todo');
        user.get('.new-todo').type(todo + '{enter}');

        user.log('Verify new todo is presented in the list');
        user.contains('label', todo).should('be.visible');

        user.log('Click Remove button');
        user.get('.destroy').click({force:true});

        user.log('Verify todo is cleared');
        user.contains('li', todo).should('not.be.visible');
    });

    it('Check the count of left item in the footer', () => {
        user.log('Visit to BackboneJS Todo MVC');
        user.visit('/examples/backbone/');

        user.log('Create new todo');
        user.get('.new-todo').type(todo + '{enter}');

        user.log('Verify new todo is presented in the list');
        user.contains('label', todo).should('be.visible');

        user.log('Verify footer text is displaying 1 item left');
        user.get('.todo-count strong').should('have.text', '1');

        user.log('Check the todo task to mark it as completed');
        user.contains('li', todo).find('.toggle').then(_toggle => {
            cy.wrap(_toggle).check();
        });

        user.log('Verify footer text is displaying 0 item left');
        user.get('.todo-count strong').should('have.text', '0');
    });
});
  
  