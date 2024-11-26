package handlers

import (
	"net/http"

	"github.com/Renan-Parise/autoease/internal/middlewares"
	"github.com/Renan-Parise/autoease/internal/usecases"

	"github.com/gin-gonic/gin"
)

type IntensityHandler struct {
	intensityUseCase usecases.IntensityUseCase
}

func NewIntensityHandler(router *gin.RouterGroup, iu usecases.IntensityUseCase) {
	handler := &IntensityHandler{
		intensityUseCase: iu,
	}

	intensities := router.Group("/intensities")
	intensities.Use(middlewares.JWTAuthMiddleware())
	{
		intensities.GET("/", handler.GetIntensities)
	}
}

func (h *IntensityHandler) GetIntensities(c *gin.Context) {
	intensities, err := h.intensityUseCase.GetIntensities()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, intensities)
}
