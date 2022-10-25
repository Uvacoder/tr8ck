// taken from https://github.com/papyrs/markdown-plugin/blob/main/src/plugin/utils/save.utils.ts

export const save = ({blob}: {blob: Blob}) => {
  const filename: string = 'post.md';

  if ('showSaveFilePicker' in window) {
    return exportNativeFileSystem({blob, filename});
  }

  return download({blob, filename});
};

const exportNativeFileSystem = async ({blob, filename}: {blob: Blob; filename: string}) => {
  const fileHandle: FileSystemFileHandle = await getNewFileHandle({filename});

  if (!fileHandle) {
    throw new Error('Cannot access filesystem');
  }

  await writeFile({fileHandle, blob});
};

const getNewFileHandle = ({filename}: {filename: string}): Promise<FileSystemFileHandle> => {
  const opts = {
    suggestedName: filename,
    types: [
      {
        description: 'Markdown file',
        accept: {
          'text/plain': ['.md']
        }
      }
    ]
  };

  return showSaveFilePicker(opts);
};

const writeFile = async ({fileHandle, blob}: {fileHandle: FileSystemFileHandle; blob: Blob}) => {
  const writer = await fileHandle.createWritable();
  await writer.write(blob);
  await writer.close();
};

const download = ({filename, blob}: {filename: string; blob: Blob}) => {
  const a: HTMLAnchorElement = document.createElement('a');
  a.style.display = 'none';
  document.body.appendChild(a);

  const url: string = window.URL.createObjectURL(blob);

  a.href = url;
  a.download = `${filename}.md`;

  a.click();

  window.URL.revokeObjectURL(url);
  a.parentElement?.removeChild(a);
};