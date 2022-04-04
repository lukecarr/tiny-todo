package cmd

import (
	"bytes"
	"io/ioutil"
	"testing"

	"github.com/spf13/cobra"
	"github.com/stretchr/testify/assert"
)

func TestMakeRootCmd(t *testing.T) {
	assert := assert.New(t)
	cmd := MakeRootCmd()

	assert.NotNil(cmd)
	assert.IsType(&cobra.Command{}, cmd)
	assert.Equal("tiny-todo", cmd.Use)
}

func TestExecuteRootCmd(t *testing.T) {
	assert := assert.New(t)

	b := bytes.NewBufferString("")
	cmd := MakeRootCmd()
	cmd.SetOut(b)

	assert.NoError(cmd.Execute())

	out, err := ioutil.ReadAll(b)
	assert.NoError(err)

	assert.Equal("Run and manage tiny-todo\n\n", string(out))
}
