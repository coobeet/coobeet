package eliza

import (
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestReplyToGoodbyes(t *testing.T) {
	t.Parallel()
	for _, input := range []string{"bye", "quit", "exit", "goodbye"} {
		response, end := Reply(input)
		assert.True(t, end)
		assert.Contains(t, goodbyeResponses, response)
	}
}

func TestDefaultAnswers(t *testing.T) {
	t.Parallel()
	for i := 0; i < 3; i++ {
		response, _ := Reply("i have" + strings.Repeat(" ", i))
		assert.Contains(t, defaultResponses, response)
	}
}

func TestHello(t *testing.T) {
	t.Parallel()
	response, _ := Reply("hello eliza!")
	assert.Contains(t, response, "Hello")

	response, _ = Reply("hello there")
	assert.Contains(t, response, "Hello")
}

func TestReflectiveAnswers(t *testing.T) {
	t.Parallel()
	response, _ := Reply("i have a problem")
	assert.Contains(t, response, "a problem")

	response, _ = Reply("i have a problem with your tone")
	assert.Contains(t, response, "a problem with my tone")
}
