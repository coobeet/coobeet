package tinyurl

import (
	"errors"
	"net/url"

	"github.com/google/uuid"
	"go.einride.tech/aip/resourceid"
)

type TinyUrl struct {
	uid       uuid.UUID
	tinyUrlId string
	code      string
	longUrl   url.URL
}

func New(uid uuid.UUID, tinyUrlId, code string, longUrl url.URL) (*TinyUrl, error) {
	if uid == uuid.Nil {
		return nil, errors.New("uid cannot be nil")
	}
	if err := resourceid.ValidateUserSettable(tinyUrlId); err != nil {
		return nil, err
	}
	if code == "" {
		return nil, errors.New("code cannot be empty")
	}
	if longUrl.String() == "" {
		return nil, errors.New("longUrl cannot be empty")
	}
	return &TinyUrl{
		uid:       uid,
		tinyUrlId: tinyUrlId,
		code:      code,
		longUrl:   longUrl,
	}, nil
}

func (t *TinyUrl) Uid() uuid.UUID {
	return t.uid
}

func (t *TinyUrl) TinyUrlId() string {
	return t.tinyUrlId
}

func (t *TinyUrl) Code() string {
	return t.code
}

func (t *TinyUrl) LongUrl() url.URL {
	return t.longUrl
}

func (t *TinyUrl) TinyUrl() url.URL {
	tinyUrl, err := url.Parse("https://frankh.dev/r/" + t.code)
	if err != nil {
		panic(err)
	}
	return *tinyUrl
}
