import { zipFolderSync } from './archive_utils';
import { existsSync } from 'fs';
import { info } from './log';
import { createSecretKey } from 'crypto';

const createWorkspaceZip = (workspaceFolder: string | null): string | null => {
    let resolvedWorkspaceFolder = workspaceFolder
    if (resolvedWorkspaceFolder === null || workspaceFolder?.length === 0) {
      if (existsSync('.maestro')) {
        resolvedWorkspaceFolder = '.maestro'
        info("Packaging .maestro folder")
      } else if (existsSync('.mobiledev')) {
        resolvedWorkspaceFolder = '.mobiledev'
        info("Packaging .mobiledev folder")
      } else {
        throw new Error("Default workspace directory does not exist: .maestro/")
      }
    } else if (!existsSync(resolvedWorkspaceFolder)) {
      throw new Error(`Workspace directory does not exist: ${resolvedWorkspaceFolder}`)
    }
    zipFolderSync(resolvedWorkspaceFolder, 'workspace.zip');
    return 'workspace.zip'
  }

  createWorkspaceZip('/Users/felipevolpone/p/monorepo/.maestro')