describe('Todo MVC test', () => {
    const user = cy;
  
    it('Check Ability to access to main homepage', () => {
        user.log('Visit to homepage');
        user.visit('/');

        user.log('Check if logo is displayed');
        user.get('.logo').should('be.visible');
    });

    it('Check available buttons', () => {
        user.log('Visit to homepage');
        user.visit('/');

        user.log('Check the navigation of Download button')
        user.contains('a', 'Download')
            .invoke('attr', 'href')
            .should('eq', 'https://github.com/tastejs/todomvc/archive/master.zip');

        user.log('Check the navigation of View on GitHub button')
        user.contains('a', 'View on GitHub')
            .invoke('attr', 'href')
            .should('eq', 'https://github.com/tastejs/todomvc');

        user.log('Check the navigation of Blog button')
        user.contains('a', 'Blog')
            .invoke('attr', 'href')
            .should('eq', 'https://medium.com/@tastejs');
    });

    it('Check Introduction text', () => {
        user.log('Visit to homepage');
        user.visit('/');

        user.log('Check if Introduction content is displayed');
        user.contains('h2', 'Introduction')
            .should('be.visible')
    })

    it('Check Examples filter buttons', () => {
        user.log('Visit to homepage');
        user.visit('/');

        user.log('Click JavaScript filter button');
        user.contains('paper-tab div', 'JavaScript')
            .should('be.visible')
            .click();
        user.log('Check if The result text is displayed');
        user.get('.js-app-list[style="display: block;"] .applist-intro')
            .invoke('text')
            .should('contain', 'These are examples written in pure JavaScript.');

        user.log('Click Compile-to-JS filter button');
        user.contains('paper-tab div', 'Compile-to-JS').click();
        user.log('Check if The result text is displayed');
        user.get('.js-app-list[style="display: block;"] .applist-intro')
            .invoke('text')
            .should('contain', 'These are applications written in programming\n\t\t\t\t\t\t\t\tlanguages that compile to JavaScript.');

        user.log('Click Labs filter button');
        user.contains('paper-tab div', 'Labs').click();
        user.log('Check if The result text is displayed');
        user.get('.js-app-list[style="display: block;"] .applist-intro')
            .invoke('text')
            .should('contain', 'These are examples written in JavaScript that\n\t\t\t\t\t\t\t\twe are still evaluating.');
    });
});
  
  