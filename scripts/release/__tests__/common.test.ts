import { getMarkdownSection } from '../common';

describe('getMarkdownSection', () => {
  it('gets the section correctly', () => {
    const text = `
    # hello

    hi

    # world

    hey
    `;
    expect(getMarkdownSection(text, '# hello')).toMatchInlineSnapshot(`
      "# hello

      hi
      "
    `);
  });

  it('gets the sub headings', () => {
    const text = `
    # hi

    # hello

    ## sub-heading

    hello

    # this shouldn't be included

    right?
    `;

    expect(getMarkdownSection(text, '# hello')).toMatchInlineSnapshot(`
      "# hello

      ## sub-heading

      hello
      "
    `);
  });

  it('gets the whole text till the end', () => {
    const text = `
    # hi

    # hello

    this is a test
    `;

    expect(getMarkdownSection(text, '# hello')).toMatchInlineSnapshot(`
      "# hello

      this is a test
      "
    `);
  });
});
