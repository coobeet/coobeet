package repository

import (
	"context"

	"github.com/google/uuid"
)

type Repository[Resource any] interface {
	Get(context.Context, uuid.UUID) (Resource, error)
	Create(context.Context, Resource) error
	Update(
		context.Context,
		uuid.UUID,
		func(context.Context, Resource) (Resource, error),
	) error
	Delete(context.Context, uuid.UUID) error
}
