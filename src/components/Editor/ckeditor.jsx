import {ClassicEditor as ClassicEditorBase} from '@ckeditor/ckeditor5-editor-classic';
import {Essentials} from '@ckeditor/ckeditor5-essentials';
import {Autoformat} from '@ckeditor/ckeditor5-autoformat';
import {Bold, Code, Italic} from '@ckeditor/ckeditor5-basic-styles';
import {BlockQuote} from '@ckeditor/ckeditor5-block-quote';
import {Heading} from '@ckeditor/ckeditor5-heading';
import {Link} from '@ckeditor/ckeditor5-link';
import {List} from '@ckeditor/ckeditor5-list';
import {Paragraph} from '@ckeditor/ckeditor5-paragraph';
import {Alignment} from "@ckeditor/ckeditor5-alignment";
import {
    AutoImage,
    Image,
    ImageCaption,
    ImageInsert,
    ImageResize,
    ImageStyle,
    ImageToolbar,
    ImageUpload
} from "@ckeditor/ckeditor5-image";
import {SourceEditing} from '@ckeditor/ckeditor5-source-editing';
import {Autosave} from "@ckeditor/ckeditor5-autosave";
import {BlockToolbar} from "@ckeditor/ckeditor5-ui";
import {CloudServices} from "@ckeditor/ckeditor5-cloud-services";
import {CodeBlock} from "@ckeditor/ckeditor5-code-block";
import {HorizontalLine} from "@ckeditor/ckeditor5-horizontal-line";
import {Indent, IndentBlock} from "@ckeditor/ckeditor5-indent";
import {MediaEmbed, MediaEmbedToolbar} from "@ckeditor/ckeditor5-media-embed";
import {PasteFromOffice} from "@ckeditor/ckeditor5-paste-from-office";
import {Table, TableToolbar} from "@ckeditor/ckeditor5-table";
import {TextTransformation} from "@ckeditor/ckeditor5-typing";
import {WordCount} from "@ckeditor/ckeditor5-word-count";
import {ShowBlocks} from '@ckeditor/ckeditor5-show-blocks';

import {GeneralHtmlSupport} from '@ckeditor/ckeditor5-html-support';
import {Style} from '@ckeditor/ckeditor5-style';


import './ckeditor.css'
import {SimpleUploadAdapter} from "@ckeditor/ckeditor5-upload";

ClassicEditorBase.builtinPlugins = [
    GeneralHtmlSupport,
    Alignment,
    AutoImage,
    Autoformat,
    Autosave,
    SimpleUploadAdapter,
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
            '|', 'style', 'heading', 'bold', 'italic', 'link', 'textTransformation',
            '|', 'bulletedList', 'numberedList', 'alignment',
            '|', 'indent', 'indentBlock',
            '|', 'imageUpload', 'imageInsert', 'imageStyle',
            '|', 'insertTable', 'mediaEmbed',
            '|', 'blockQuote', 'code', 'codeBlock',
            '|', 'pasteFromOffice',
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
                classes: ['category']
            },
            {
                name: 'Info box',
                element: 'p',
                classes: ['info-box']
            },
        ]
    }
};


export default ClassicEditorBase;
