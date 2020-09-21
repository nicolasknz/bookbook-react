import React from 'react';
import renderer from 'react-test-renderer';
import BookFeedback from '../index';
import * as redux from 'react-redux'

const spy = jest.spyOn(redux, 'useSelector')
spy.mockReturnValue({ session: 'test' })

describe("Render test", () => {
  it('renders correctly', () => {
    const tree = renderer

      .create(<BookFeedback book={{}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const book = { id: 1, title: "test", img_url: "img" }
    const tree = renderer

      .create(<BookFeedback book={book} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

});
