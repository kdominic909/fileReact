# Change Log

<a href="https://www.files-ui.com">
<p align="center">
<img src="https://user-images.githubusercontent.com/43678736/226257748-6ba2f8cf-59c5-40d1-a545-a388ddab0f68.png" width="150" height="150" alt="fui-logo"/>
</p>
</a>

<h1 align="center">Files ui</h1>

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.
Thils file also consider all dropzone-ui [releases](https://github.com/dropzone-ui/dropzone-ui-react/releases).

## [1.2.0](https://github.com/files-ui/files-ui-react/releases/tag/v1.1.0) (2024-01-21)

## 🧪 🚀 Allow uploading files with different URLs

- Enhanced components to perform the upload operation with a different urls for each [ExtFile](https://www.files-ui.com/types#extfile). 
  - [ExtFile](https://www.files-ui.com/types#extfile): Added a new property in ExtFile type: `uploadUrl`.
  - [\<Dropzone/\>](https://www.files-ui.com/components/dropzone) & [\<FileInputButton/\>](https://www.files-ui.com/components/fileinputbutton): There is a new sub-prop `uploadConfig.customUrl()` that is a fucntion that given an extFile object, obtains a custom url.
- The order of priority is as follows:
    - 1) ExtFile.uploadUrl
    - 2) DropzoneProps.UploadConfig.customUrl
    - 3) DropzoneProps.UploadConfig.url

- The setup can be as follows:

```jsx
    ...
    return(
      <React.Fragment>
        <Dropzone
            uploadConfig={
              customUrl: (extFile)=> "https://urlfromserver/" + extFile.name
            }
        />
        <FileInputButton
            uploadConfig={
              customUrl: (extFile)=> "https://urlfromserver/" + extFile.name
            }
        />
        <Dropzone
          onChange={updateFiles}
          value={files}
        >
          {files.map((file) => (
              <FileMosaic key={file.id} {...file} uploadUrl={"https://urlfromserver/" + extFile.id}/>
            ))}
        </Dropzone>

      
      </React.Fragment>
    )
```

## [1.1.0](https://github.com/files-ui/files-ui-react/releases/tag/v1.1.0) (2023-12-17)

## 🧪 New features and 🐛 :hammer: Improvements

- [\<Dropzone/\>](https://www.files-ui.com/components/dropzone):
  - There is a new prop `groupUpload` that allows to perform the upload operation of a group of files in a single request.
  - [FIX: ActionButtonItem.label not working #26 #27](https://github.com/files-ui/files-ui-react/pull/27): Pull request to solve issue on ActionButtonItem.label prop has been merged.
  - [FIX: ActionButtonItem.disabled not working #28 #29](https://github.com/files-ui/files-ui-react/pull/29): Pull request to solve issue on ActionButtonItem.disabled prop has been merged
  - [FEAT: Gives the option to send all files in a single request #32 #34](https://github.com/files-ui/files-ui-react/pull/34): Pull request to allow uploading a group of files in a single request.

## [Files-ui (1.0.0) = Dropzone-ui(7.0.0)](https://github.com/files-ui/files-ui-react/releases/tag/v1.0.0) (2023-03-28)

## 🧪 New features and 🐛 :hammer: Improvements

- [ExtFile](https://www.files-ui.com/types#extfile): Data estructure that "extends" the File Object. This object is designed to allow the information exchange between components. This data type replaces the old "FileValidate" type from dropzone-ui.

- [\<FileMosaic/\>](https://www.files-ui.com/components/filemosaic): This new component replaces the old "FileItem" component.

  - Dark mode: Now this component can be adpted to a dark mode pages with the respective prop.
  - New icons: Icons for delete were changed.
  - For uploading, the loader can support to display the current progress.

- [\<FileCard/\>](https://www.files-ui.com/components/filecard): This new component is an alternative version of FileMosaic. It displays the file info in a card. Receives the same props as FileMosaic plus `elevation`.

- [\<FileInputButton/\>](https://www.files-ui.com/components/fileinputbutton): This component replaces the old "InputButton" component. The features are the same as the dropzone except the header and footer related features. That means that this component now can trigger the upload progress.
  Validation is optional, so non valid files can be uploaded.

- [\<Avatar/\>](https://www.files-ui.com/components/avatar): This new component is designed tohandle the selection of images for changing the avatar. Can recieve as source an string url or even a File.

- [\<FullScreen/\>](https://www.files-ui.com/components/fullscreen): The old components "FullScreenImage" and "FullScreenVideo" have been separated into FUllScreen, ImagePreview and VideoPreview.

  - FullScreen: component for display in a fullscreen backdrop other components.
  - [ImagePreview](https://www.files-ui.com/api/imagepreview): component is an \<img/\> tag enhanced to allow as `src` a string url or a ile object.
  - [VideoPreview](https://www.files-ui.com/api/videopreview): component is an \<video/\> tag enhanced to allow as `src` a string url or a ile object.

- [\<Dropzone/\>](https://www.files-ui.com/components/dropzone): This component has been refactored to improve the design, colors and internal components such us headeror footer.

  - Header and footer can be handled through 2 new props: `headerConfig` and `footerConfig`
  - Action buttons: these are external buttons thta can trigger the default operations in dropzone.
  - Uploading: The upload operation now is completele handled using pure javascript without external libraries wich means `axios` is no longer a dependency.

- `smartImgFit`: This is a special prop for FileMosaic, FileCard and Avatar components that makes someway "smart" the components to fit the images depeding on their orientation ("landscape" or protrait). Square images are hardly afected.

  - How it works?

    - If false, image width will be set to 100%.
      If present, image will be analized and displayed according to its heigh and width. Image with height greater than its width has a "portrait" orientation. Otherwise it has a "landscape" orientation. .

          - If value is "orientation", image will be displayed complete by giving 100% to width prop if the orientation is "landscape". When orientation is "portrait", height prop will be set to 100%. Some images will show an empty space.

          - If value is "center", image will be centered and will not be displayed complete. This the empty space is avoided. This is achived by giving 100% to width prop if the orientation is "portrait". When orientation is "landscape", height prop will be set to 100%.

- [FilesUIProvider](https://www.files-ui.com/global-config): Localization and darkMode are props that can be set globally by using the React context API. Also the new feature that comes wit this improvement is that now is possible to set custom file icons for every file type.

- [Download Files](https://www.files-ui.com/global-config): Both FileCard and FileMosaic components are able to perform download from same origin or external resources.

## 📚 Improved documentation.

- The complete documentation can be found in files-ui [web page](https://www.files-ui.com).

<a name="6.4.0"></a>

## [6.4.0 dropzone-ui](https://github.com/dropzone-ui/dropzone-ui-react/releases/tag/v6.4.0) (2021-12-12)

## 🧪 New features

- \<FileItem/\>: Added `onWatch` prop. This prop provides an event handler for allowing full screen video previews. It works like `onSee` prop. It returns as first parameter the file object. If `onWatch` is present, file is `valid` and file type is `video`, `FileItem` will display the `play` button.
- \<VideoPreview/\>: Added new component`VideoPreview`. This component is quite similar to `FullScreenPreview`. As the name sugests, this component is meant to be used to show video previews. Supported videos are the default supported videos by a [`<video/>`](https://www.w3schools.com/tags/tag_video.asp) tag (mp4, ogg, webm). First prop `videoSource` can be a `File` object or a `URI string` representation. Works in the same way as `FullScreenPreview`, it rcieves a `onClose` prop and an `open` prop.
  It also recieves `autoplay` and `controls` props like classic html [`<video/>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attributes) tag.

## 🐛 Fixes or improvements

- \<FullScreenPreview/>: Improved media query style.

## 📚 Improved documentation.

- Added documentation about new prop on `FileItem`.
- Added documentation about new component `VideoPreview`.

<a name="6.3.6"></a>

## [6.3.6 dropzone-ui](https://github.com/dropzone-ui/dropzone-ui-react/releases/tag/v6.3.6) (2021-07-12)

## 🧪 New features

- \<FileItem/\>: Added `resultOnToolip` prop. This prop provides another hover interaction. If present or `true`, FileItem will show the file validation status and the upload status on a nice tooltip. Otherwhise, if not present, false or undefined, FileItem will display the result on the InfoLayer. Special thanks to @mateusmx, 👏 who suggested this feature🧪.

- \<Dropzone/\>: Added `disableScroll` prop. This prop disables the css property `overflow: auto` in FileItemContainer inside Dropzone, when it displays the FileItem list inside of it. It also disables the `maxHeight` property and forces the `view` prop to be `"grid"`. The purpose of this special prop is to allow FileItemContainer to grow at the same time FileItem list increases and prevent triggering scrollbars.

## 🐛 Fixes or improvements

- \<Dropzone/>: Fixed issue in FileItemContainer that made it to overflow the size of Dropzone.

## 📚 Improved documentation.

- Added documentation about this new features

<a name="6.2.0"></a>

## [6.2.0 dropzone-ui](https://github.com/dropzone-ui/dropzone-ui-react/releases/tag/v6.2.0) (2021-26-11)

### New features

- \<FileItem/\>: Added `alwaysActive` prop. This prop provides hover interaction. If false (by default), FileItem will hide the main layer with all the buttons except the file validation status and the upload status. If true, main layer will be visible all the time.
- \<FileItem/\>: Added `elevation` prop. This prop provides the user to decide about the shadow and border on the `FileItem` container.
- `Webpage` in beta version was released. You can visit [dropzone-ui.com](http://www.dropzone-ui.com). In there you can find a nice code generator.

### Fixesor improvements

- \<Dropzone/\>: Fixed Spanish translation on footer.
- \<Dropzone/\>: Hide "view" button when view prop is provided.
- \<Dropzone/\>: Fix issue that hides dropzone label when FileItems are outside.
- \<Dropzone/\>: Fixed minor issues on minHeight.
- \<FileItem/\>: Hide "delete" button when onDelete prop is not provided
- \<FileItem/\>: Change `word-break` css propertie from `break-all` to `break-word`;

### Future feature

- \<FileItem/\>: Show `upload status` on hover event.

<a name="5.5.6"></a>

## [5.5.6 dropzone-ui](https://github.com/dropzone-ui/dropzone-ui-react/releases/tag/v5.3.0) (2021-26-11)

- 🧪 Added Localization support for ✨ **Russian** and **Chinese** ✨.
- 🐛 Fixed small bugs.
- 📚 Improved documentation.

<a name="3.0.1"></a>

## [3.0.1 dropzone-ui](https://github.com/dropzone-ui/dropzone-ui/compare/v2.8.1...v3.0.1) (2021-10-11)

### Features

- Translation support for `Russian` :ru: and also simplified and traditional `Chinese` :cn: .
- File Item component can show image directly from url.
- Minor bugs on Dropzone useStyle hook fixed.

<a name="3.0.1"></a>

## [3.0.1 dropzone-ui](https://github.com/dropzone-ui/dropzone-ui/compare/v2.8.1...v3.0.1) (2021-10-11)

### Features

- Translation support for `Portuguese`.
  <a name="2.8.1"></a>

## [2.8.1 dropzone-ui](https://github.com/dropzone-ui/dropzone-ui/compare/v2.8.1...v2.1.1) (2021-10-08)

### Features

- Translation support for `French`.

<a name="2.1.1"></a>

## [2.1.1 dropzone-ui](https://github.com/dropzone-ui/dropzone-ui/compare/v2.1.1...v2.0.0) (2021-10-01)

### Features

- Fixed issue on tsconfig.json that affected build process

<a name="2.1.0"></a>

## [2.1.0 dropzone-ui](https://github.com/dropzone-ui/dropzone-ui/compare/v2.1.0...v2.0.0) (2021-09-28)

### Features

- Add preventDefault function on InputButton component
- Improve Readme.md
- Add Openbase badge
- Improve description

<a name="2.0.0"></a>

## [2.0.0 dropzone-ui](https://github.com/dropzone-ui/dropzone-ui/compare/v2.0.0...v1.2.10) (2021-09-21)

### Features

- Improve Readme.md
- Add localization for `Spanish` and `English`
- Add Readme_es.md file

<a name="1.2.10"></a>

## [1.2.10 dropzone-ui](https://github.com/dropzone-ui/dropzone-ui/compare/v1.0.1...v1.0.2) (2021-09-21)

### Features

- Improve Readme.md
- Add quiality badge
  <a name="1.2.9"></a>

## [1.2.9 dropzone-ui](https://github.com/dropzone-ui/dropzone-ui/compare/v1.0.1...v1.0.2) (2021-09-12)

### Features

- Release Input File Button
- Release FileItemContainer Compnent
- Improve API doc for all components (now arranged alphabetically)

<a name="1.1.28"></a>

## [1.1.28 dropzone-ui](https://github.com/dropzone-ui/dropzone-ui/compare/v1.0.1...v1.0.2) (2021-09-09)

### Features

- Minor bug fixed, upload status not hiding on info open fixed

<a name="1.0.28"></a>

## [1.0.28 dropzone-ui](https://github.com/dropzone-ui/dropzone-ui/compare/v1.0.1...v1.0.2) (2021-09-08)

### Features

- added readme status badges

- Add Travis ci and coveralls integration

- update README description
- Dropzone, FileItem and FullScreenImage components released

<a name="1.0.1"></a>

## [1.0.1 dropzone-ui](https://github.com/dropzone-ui/dropzone-ui/compare/v1.0.0...v1.0.1) (2021-08-28)

### Features

- README improvements

<a name="1.0.0"></a>

# [1.0.0 dropzone-ui](https://github.com/dropzone-ui/dropzone-ui/compare/v0.1.2...v1.0.0) (2021-08-28)
