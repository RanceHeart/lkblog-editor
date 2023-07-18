import { ClassicEditor as ClassicEditorBase } from '@ckeditor/ckeditor5-editor-classic';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { Alignment } from "@ckeditor/ckeditor5-alignment";
import {AutoImage} from "@ckeditor/ckeditor5-image";
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';
import { Autosave } from "@ckeditor/ckeditor5-autosave";
import Base64UploadAdapter from "@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter.js";
import BlockToolbar from "@ckeditor/ckeditor5-ui/src/toolbar/block/blocktoolbar.js";
import CloudServices from "@ckeditor/ckeditor5-cloud-services/src/cloudservices.js";
import Code from "@ckeditor/ckeditor5-basic-styles/src/code.js";
import CodeBlock from "@ckeditor/ckeditor5-code-block/src/codeblock.js";
import HorizontalLine from "@ckeditor/ckeditor5-horizontal-line/src/horizontalline.js";
import Image from "@ckeditor/ckeditor5-image/src/image.js";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption.js";
import ImageInsert from "@ckeditor/ckeditor5-image/src/imageinsert.js";
import ImageResize from "@ckeditor/ckeditor5-image/src/imageresize.js";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle.js";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar.js";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload.js";
import Indent from "@ckeditor/ckeditor5-indent/src/indent.js";
import IndentBlock from "@ckeditor/ckeditor5-indent/src/indentblock.js";
import Markdown from "@ckeditor/ckeditor5-markdown-gfm/src/markdown.js";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed.js";
import MediaEmbedToolbar from "@ckeditor/ckeditor5-media-embed/src/mediaembedtoolbar.js";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice.js";
import Table from "@ckeditor/ckeditor5-table/src/table.js";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar.js";
import TextTransformation from "@ckeditor/ckeditor5-typing/src/texttransformation.js";
import WordCount from "@ckeditor/ckeditor5-word-count/src/wordcount.js";
import { ShowBlocks } from '@ckeditor/ckeditor5-show-blocks';

import { GeneralHtmlSupport } from '@ckeditor/ckeditor5-html-support';
import { Style } from '@ckeditor/ckeditor5-style';
import './ckeditor.css'

ClassicEditorBase.builtinPlugins = [
  GeneralHtmlSupport,
  Alignment,
  AutoImage,
  Autoformat,
  Autosave,
  Base64UploadAdapter,
  BlockQuote,
  BlockToolbar,
  Bold,
  CloudServices,
  Code,
  CodeBlock,
  Essentials,
  Heading,
  HorizontalLine,
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  Markdown,
  MediaEmbed,
  MediaEmbedToolbar,
  Paragraph,
  PasteFromOffice,
  Table,
  TableToolbar,
  TextTransformation,
  WordCount,
  ShowBlocks,
  SourceEditing,
  Style
];

ClassicEditorBase.defaultConfig = {
  toolbar: {
    items: [
      'undo', 'redo',
      '|', 'sourceEditing',
      '|', 'style', 'heading', 'bold', 'italic', 'link', 'textTransformation',
      '|', 'bulletedList', 'numberedList', 'alignment',
      '|', 'indent', 'indentBlock',
      '|', 'imageUpload', 'imageInsert', 'imageStyle',
      '|', 'insertTable', 'mediaEmbed',
      '|', 'blockQuote', 'code', 'codeBlock',
      '|', 'markdown', 'pasteFromOffice',
      '|', 'horizontalLine',
      '|', 'wordCount', 'showBlocks'
    ],
  },
  shouldNotGroupWhenFull: true,
  language: 'en',
  blockToolbar: [
    'codeBlock',
    'code',
    'heading'
  ],
  image: {
    toolbar: [
      'imageTextAlternative',
      'toggleImageCaption',
      'imageStyle:inline',
      'imageStyle:block',
      'imageStyle:side'
    ]
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells'
    ]
  },
  style: {
    definitions: [
      {
        name: 'Article category',
        element: 'h3',
        classes: [ 'category' ]
      },
      {
        name: 'Info box',
        element: 'p',
        classes: [ 'info-box' ]
      },
    ]
  }
};


export default ClassicEditorBase;
