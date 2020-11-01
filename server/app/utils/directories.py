import os, shutil, sys

# Move all files from subdirectories to root directories
def move_to_root_folder(root_path, curr_path):
    for filename in os.listdir(curr_path):
        if os.path.isfile(os.path.join(curr_path, filename)):
            shutil.move(os.path.join(curr_path, filename), os.path.join(root_path, filename))
        elif os.path.isdir(os.path.join(curr_path, filename)):
            move_to_root_folder(root_path, os.path.join(curr_path, filename))
        else:
            sys.exit("Should never reach here.")
    # remove empty folders
    if curr_path != root_path:
        os.rmdir(curr_path)