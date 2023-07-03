const levelsData = [
    {
        helpTitle: 'Select elements by their type',
        selectorName: 'Type Selector',
        doThis: 'Select the birds',
        selector: 'bird',
        syntax: 'A',
        help: 'Selects all elements of type <strong>A</strong>. Type refers to the type of tag, so <tag>div</tag>, <tag>p</tag> and <tag>ul</tag> are all different element types.',
        examples: [
            '<strong>div</strong> selects all <tag>div</tag> elements.',
            '<strong>p</strong> selects all <tag>p</tag> elements.',
        ],
        boardMarkup: `
      <bird class='skywalker'></bird>
      <bird class='skywalker'></bird>
      <bird class='skywalker'></bird>
      `,
    },
    {
        helpTitle: 'Select an element inside another element',
        selectorName: 'Type Selector',
        doThis: 'Select the vader pig',
        selector: 'ship pig',
        syntax: 'A B',
        help: 'Selects all <strong>B</strong> inside of <strong>A</strong>. <strong>B</strong> is called a descendant because it is inside of another element.',
        examples: [
            '<strong>p strong</strong> selects all <tag>strong</tag> elements that are inside of any <tag>p</tag>',
        ],
        boardMarkup: `
      <bird class='skywalker'></bird>
      <ship>
      <pig id='black' class="vader"></pig>
      </ship>
      <pig class='officer'></pig>
      `,
    },
    {
        helpTitle: 'Select elements by their class',
        selectorName: 'Class Selector',
        doThis: 'Select the white eggs',
        selector: '.white',
        syntax: '.classname',
        help: 'The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.',
        examples: ['<strong>.neato</strong> selects all elements with <strong>class="neato"</strong>'],
        boardMarkup: `
      <cage><egg class="white"></egg></cage>
      <cage><egg class="yellow"></egg></cage>
      <cage><egg class="white"></egg></cage>
      `,
    },
    {
        helpTitle: 'Select elements with an ID',
        selectorName: 'ID Selector',
        doThis: 'Select the blue bird',
        selector: '#blue',
        syntax: '#id',
        help: 'The class selector selects all elements with that class attribute. Elements can only have one ID, but many classes.',
        examples: [
            '<strong>#cool</strong> selects any element with <strong>id="cool"</strong>',
            '<strong>ul#long</strong> selects <tag>ul id="long"</tag>',
        ],
        boardMarkup: `
      <pig class="snowtrooper"></pig>
      <bird class='pilot' id="blue"></bird>
      <pig class='officer'></pig>
      `,
    },
    {
        helpTitle: 'You can select everything!',
        selectorName: 'The Universal Selector',
        doThis: 'Select all the things!',
        selector: '*',
        syntax: '*',
        help: 'You can select all elements with the universal selector! ',
        examples: ['<strong>p *</strong> selects any element inside all <tag>p</tag> elements.'],
        boardMarkup: `
      <cage id='cage'><egg class="yellow"></egg></cage>
      <ship></ship>
      <bird class='pilot'></bird>
      <pig class='bubbles'></pig>
      <pig class='frozen' id='cold'></pig>
      <robot id='robot'></robot>
      `,
    },
    {
        helpTitle: 'Combine the Universal Selector',
        selectorName: 'The Universal Selector',
        doThis: 'Select everything on a ship',
        selector: 'ship *',
        syntax: 'A&nbsp;&nbsp;*',
        help: 'This selects all elements inside of <strong>A</strong>.',
        examples: [
            '<strong>p *</strong> selects every element inside all <tag>p</tag> elements.',
            '<strong>ul.fancy *</strong> selects every element inside all <tag>ul class="fancy"</tag> elements.',
        ],
        boardMarkup: `
      <ship id="ship">
        <pig class='vader' id="black"></pig>
      </ship>
      <ship id="ship">
        <robot id="r2"></robot>
      </ship>
      <ship>
        <pig class='officer' id="green"></pig>
      </ship>`,
    },
    {
        helpTitle: 'Select an element that directly follows another element',
        selectorName: 'Adjacent Sibling Selector',
        doThis: "Select every pig that's next to a ship",
        selector: 'ship + pig',
        syntax: 'A + B',
        help: "This selects all <strong>B</strong> elements that directly follow <strong>A</strong>. Elements that follow one another are called siblings. They're on the same level, or depth. <br/><br/>In the HTML markup for this level, elements that have the same indentation are siblings.",
        examples: [
            '<strong>p + .intro</strong> selects every element with <strong>class="intro"</strong> that directly follows a <tag>p</tag>',
            '<strong>div + a</strong> selects every <tag>a</tag> element that directly follows a <tag>div</tag>',
        ],
        boardMarkup: `
      <ship>
        <robot id="r2"></robot>
      </ship>
      <pig class='frozen'></pig>
      <ship></ship>
      <pig class='bubbles'></pig>
      `,
    },
    {
        helpTitle: 'Select elements that follows another element',
        selectorName: 'General Sibling Selector',
        doThis: 'Select the pigs beside the bird',
        syntax: 'A ~ B',
        selector: 'bird ~ pig',
        help: 'You can select all siblings of an element that follow it. This is like the Adjacent Selector (A + B) except it gets all of the following elements instead of one.',
        examples: ['<strong>A ~ B</strong> selects all <strong>B</strong> that follow a <strong>A</strong>'],
        boardMarkup: `
        <bird class='pilot'></bird>
        <pig class='bubbles'></pig>
        <pig class='vader'></pig>
        <bird class='skywalker'></bird>
        <pig class='snowtrooper'></pig>
        <pig class='frozen'></pig>
      `,
    },
    {
        helpTitle: 'Select direct children of an element',
        selectorName: 'Child Selector',
        doThis: 'Select the pig directly in a cage',
        syntax: 'A > B&nbsp;',
        selector: 'cage > pig',
        help: 'You can select elements that are direct children of other elements. A child element is any element that is nested directly in another element. <br><br>Elements that are nested deeper than that are called descendant elements.',
        examples: [
            '<strong>A > B</strong> selects all <strong>B</strong> that are a direct children <strong>A</strong>',
        ],
        boardMarkup: `
      <cage>
        <pig id='officer'></pig>
      </cage>
        <bird></bird>
      <cage>
        <pig id='officer'></pig>
      </cage>
      `,
    },
    {
        helpTitle: "Select elements that don't have children",
        selectorName: 'Empty Selector',
        doThis: 'Select the empty cages',
        selector: 'cage:empty',
        syntax: ':empty',
        help: "Selects elements that don't have any other elements inside of them.",
        examples: ['<strong>div:empty</strong> selects all empty <tag>div</tag> elements.'],
        boardMarkup: `
      <cage></cage>
      <cage>
        <egg class="yellow"></egg>
      </cage>
      <cage></cage>`,
    },
    {
        helpTitle: 'Select a first child element inside of another element',
        selectorName: 'First Child Pseudo-selector',
        doThis: 'Select the top egg',
        selector: 'egg:first-child',
        syntax: ':first-child',
        help: 'You can select the first child element. A child element is any element that is directly nested in another element. You can combine this pseudo-selector with other selectors.',
        examples: [
            '<strong>:first-child</strong> selects all first child elements.',
            '<strong>p:first-child</strong> selects all first child <tag>p</tag> elements.',
            '<strong>div p:first-child</strong> selects all first child <tag>p</tag> elements that are in a <tag>div</tag>.',
        ],
        boardMarkup: `
        <bird></bird>
        <ship>
          <egg class='white' id='egg'></egg>
          <egg class='yellow'></egg>
        </ship>
        <bird></bird>
      `,
    },
    {
        helpTitle: 'Select an element by its order in another element',
        selectorName: 'Nth Child Pseudo-selector',
        doThis: 'Select the 4th pig',
        selector: ':nth-child(4)',
        syntax: ':nth-child(A)',
        help: 'Selects the <strong>nth</strong> (Ex: 1st, 3rd, 12th etc.) child element in another element.',
        examples: [
            '<strong>:nth-child(8)</strong> selects every element that is the 8th child of another element.',
            '<strong>div p:nth-child(2)</strong> selects the second <strong>p</strong> in every <strong>div</strong>',
        ],
        boardMarkup: `
        <pig class='officer'></pig>
        <pig class='snowtrooper'></pig>
        <pig class='vader'></pig>
        <pig class='bubbles'></pig>
        <pig class='frozen'></pig>
      `,
    },
    {
        helpTitle: 'Select an element that are the only element inside of another one.',
        selectorName: 'Only Child Pseudo-selector',
        doThis: 'Select the robot and the pig on the ship',
        selector: 'ship :only-child',
        syntax: ':only-child',
        help: 'You can select any element that is the only element inside of another one.',
        examples: [
            '<strong>span:only-child</strong> selects the <tag>span</tag> elements that are the only child of some other element.',
            '<strong>ul li:only-child</strong> selects the only <tag>li</tag> element that are in a <tag>ul</tag>.',
        ],
        boardMarkup: `
        <ship>
          <robot id="r2"></robot>
        </ship>
        <ship>
          <egg class='white' id='egg'></egg>
          <egg class='yellow'></egg>
        </ship>
        <ship>
          <pig class='vader' id="black"></pig>
        </ship>
      `,
    },
    {
        selectorName: 'Attribute Selector',
        helpTitle: 'Select all elements that have a specific attribute',
        doThis: 'Select the characters with name',
        selector: '[name]',
        syntax: '[attribute]',
        help: 'Attributes appear inside the opening tag of an element, like this: <tag>span attribute="value"</tag>. An attribute does not always have a value, it can be blank!',
        examples: [
            '<strong>a[href]</strong> selects all <tag>a</tag> elements that have a <strong>href="anything"</strong> attribute.',
            '<strong>[type]</strong> selects all elements that have a <strong>type="anything"</strong>. attribute',
        ],
        boardMarkup: `
        <bird class='pilot'></bird>
        <robot name='R2-D2'></robot>
        <pig class='bubbles'></pig>
        <pig class='vader' name='Darth Vader'></pig>
        <pig class='snowtrooper'></pig>
        <pig></pig>
        <bird name='Luke Skywalker'></bird>
`,
    },
    {
        selectorName: 'Attribute Selector',
        helpTitle: 'Select all elements that have a specific attribute',
        doThis: 'Select the bird with name Luke Skywalker',
        selector: '[name="Luke Skywalker"]',
        syntax: '[attribute="value"]',
        help: 'Attributes appear inside the opening tag of an element, like this: <tag>span attribute="value"</tag>. An attribute does not always have a value, it can be blank!',
        examples: [
            '<strong>a[href]</strong> selects all <tag>a</tag> elements that have a <strong>href="anything"</strong> attribute.',
            '<strong>[type]</strong> selects all elements that have a <strong>type="anything"</strong>. attribute',
        ],
        boardMarkup: `
        <bird class='pilot' name='Blue Squadron'></bird>
        <pig class='vader' name='Darth Vader'></pig>
        <robot name='R2-D2'></robot>
        <pig class='bubbles'></pig>
        <bird name='Luke Skywalker' ></bird>
        <pig class='snowtrooper' name='Snowtrooper'></pig>
        <pig name='Officer Pig'></pig>
`,
    },
];

export default levelsData;
