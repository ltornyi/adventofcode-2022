export type DirFile = {
  name: string,
  size: number
}

export class Directory {
  name: string;
  subdirs: Directory[];
  files: DirFile[];
  parent?: Directory;

  constructor(n: string, parent?: Directory) {
    this.name = n;
    this.subdirs = [];
    this.files = [];
    this.parent = parent;
  }

  calcFileSize() {
    return this.files.reduce((sum: number, curr: DirFile): number => sum + curr.size, 0)
  }

  calcTotalSize() {
    const subdirSize: number = this.subdirs.reduce((sum: number, subdir: Directory) => sum + subdir.calcTotalSize(), 0)
    return subdirSize + this.calcFileSize();
  }

  addSubdir(name: string) {
    const subdir = new Directory(name, this);
    this.subdirs.push(subdir);
  }

  addFile(name: string, size: number) {
    this.files.push({name: name, size: size});
  }

  findSubdir(name: string) {
    return this.subdirs.filter(subdir => subdir.name === name)[0];
  }
}