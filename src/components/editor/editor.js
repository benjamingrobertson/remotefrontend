import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ header: [2, 3, 4, false] }],
    ['bold', 'italic', 'underline', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['clean']
  ]
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image'
];

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="text-editor">
        {typeof document !== 'undefined' && (
          <ReactQuill
            ref={this.editor}
            modules={modules}
            formats={formats}
            defaultValue={this.props.value}
            onChange={(value) => this.props.handleChange(value)}
            data-hj-whitelist
          />
        )}
      </div>
    );
  }

  handleChange(value) {
    this.setState({ text: value });
  }
}
