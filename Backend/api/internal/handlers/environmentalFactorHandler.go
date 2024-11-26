package handlers

import (
	"net/http"

	"github.com/Renan-Parise/autoease/internal/middlewares"
	"github.com/Renan-Parise/autoease/internal/usecases"

	"github.com/gin-gonic/gin"
)

type EnvironmentalFactorHandler struct {
	environmentalFactorUseCase usecases.EnvironmentalFactorUseCase
}

func NewEnvironmentalFactorHandler(router *gin.RouterGroup, efu usecases.EnvironmentalFactorUseCase) {
	handler := &EnvironmentalFactorHandler{
		environmentalFactorUseCase: efu,
	}

	factors := router.Group("/environmental-factors")
	factors.Use(middlewares.JWTAuthMiddleware())
	{
		factors.GET("/", handler.GetEnvironmentalFactors)
	}
}

func (h *EnvironmentalFactorHandler) GetEnvironmentalFactors(c *gin.Context) {
	factors, err := h.environmentalFactorUseCase.GetEnvironmentalFactors()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, factors)
}
