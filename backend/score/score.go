package score

import (
	"fmt"

	"github.com/nlpodyssey/gopickle/pickle"
)

func GetScore() string {
	raw, err := pickle.Load("../yolo_model/hello_world_pickle.pkl")
	score := fmt.Sprintf("%v", raw)
	print(err)
	print(raw)

	return score
}
