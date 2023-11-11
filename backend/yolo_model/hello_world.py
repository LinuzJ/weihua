import pickle

def dump_hello_world():
    return "hello world"

# Get the string
hello_world_string = dump_hello_world()

# Dump the string to a pickle file
with open("hello_world_pickle.pkl", "wb") as pickle_file:
    pickle.dump(hello_world_string, pickle_file)
