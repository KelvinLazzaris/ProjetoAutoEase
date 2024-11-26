package utils

import (
	"bytes"
	"fmt"
	"strings"

	"github.com/Renan-Parise/autoease/internal/entities"
	"github.com/jung-kurt/gofpdf"
)

func GeneratePDF(records []*entities.UserRecord, medicineNames map[int]string, factorNames map[int]string, symptomNames map[int]string, intensityNames map[int]string) ([]byte, error) {
	pdf := gofpdf.New("P", "mm", "A4", "")
	pdf.SetFont("Arial", "", 12)

	lineHeight := 6.0 // Consistent line height

	pdf.AddPage()

	for _, record := range records {
		pdf.SetFont("Arial", "B", 14)
		pdf.Cell(0, lineHeight, fmt.Sprintf("Data do Registro: %s", record.CreatedAt.Format("02/01/2006")))
		pdf.Ln(lineHeight)

		pdf.SetFont("Arial", "", 12)
		pdf.Cell(0, lineHeight, fmt.Sprintf("Medicamentos: %s", formatNames(record.Medicines, medicineNames)))
		pdf.Ln(lineHeight)

		pdf.Cell(0, lineHeight, fmt.Sprintf("Alimentos: %s", record.Food))
		pdf.Ln(lineHeight)

		pdf.Cell(0, lineHeight, fmt.Sprintf("Fatores Ambientais: %s", formatNames(record.EnvironmentalFactors, factorNames)))
		pdf.Ln(lineHeight)

		pdf.Cell(0, lineHeight, fmt.Sprintf("Horas Dormidas: %.2f", record.HoursSlept))
		pdf.Ln(lineHeight)

		pdf.Cell(0, lineHeight, fmt.Sprintf("Horas de Atividade Física: %.2f", record.PhysicalActivityHours))
		pdf.Ln(lineHeight)

		pdf.Cell(0, lineHeight, fmt.Sprintf("Informações Adicionais: %s", record.AdditionalInfo))
		pdf.Ln(lineHeight)

		pdf.Cell(0, lineHeight, fmt.Sprintf("Crise: %s", translateCrisis(record.Crisis)))
		if record.Crisis {
			pdf.Ln(lineHeight)
			pdf.Cell(0, lineHeight, fmt.Sprintf("Duração da Crise: %d minutos", record.CrisisDuration))
			pdf.Ln(lineHeight)
			pdf.Cell(0, lineHeight, "Sintomas:")
			pdf.Ln(lineHeight)
			for _, symptom := range record.Symptoms {
				pdf.Cell(0, lineHeight, fmt.Sprintf("- Sintoma: %s", symptomNames[symptom.SymptomID]))
				pdf.Ln(lineHeight)
				pdf.Cell(0, lineHeight, fmt.Sprintf("  Faixa de Tempo: %s", symptom.TimeRange))
				pdf.Ln(lineHeight)
				pdf.Cell(0, lineHeight, fmt.Sprintf("  Ocorrências: %d", symptom.Occurrences))
				pdf.Ln(lineHeight)
				pdf.Cell(0, lineHeight, fmt.Sprintf("  Intensidade: %s", intensityNames[symptom.IntensityID]))
				pdf.Ln(lineHeight)
			}
		}

		// Add a separator line after each record
		pdf.Ln(lineHeight)
		pdf.SetDrawColor(0, 0, 0)
		pdf.Line(10, pdf.GetY(), 200, pdf.GetY())
		pdf.Ln(lineHeight)
	}

	var buf bytes.Buffer
	err := pdf.Output(&buf)
	if err != nil {
		return nil, err
	}

	return buf.Bytes(), nil
}

func formatNames(ids []int, names map[int]string) string {
	var result []string
	for _, id := range ids {
		if name, exists := names[id]; exists {
			result = append(result, name)
		} else {
			result = append(result, fmt.Sprintf("Desconhecido (%d)", id))
		}
	}
	return strings.Join(result, ", ")
}

func translateCrisis(crisis bool) string {
	if crisis {
		return "Sim"
	}
	return "Não"
}
