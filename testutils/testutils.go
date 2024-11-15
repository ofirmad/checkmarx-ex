package testutils

import (
	"github.com/ofirmad/task-manager/models"
	. "github.com/onsi/gomega"
	"time"
)

func ValidateResponse(task models.Task, responseBody map[string]interface{}) {
	Expect(task.Title).To(Equal(responseBody[models.JsonTitle]))
	Expect(task.Description).To(Equal(responseBody[models.JsonDescription]))
	Expect(task.Status).To(Equal(responseBody[models.JsonStatus]))
	Expect(responseBody).To(HaveKey(models.JsonID))
	Expect(responseBody[models.JsonID]).NotTo(BeNil())
	Expect(responseBody).To(HaveKey(models.JsonCreatedAt))
	Expect(responseBody[models.JsonCreatedAt]).NotTo(BeEmpty())
}

func ValidateIDAndCreatedAt(task models.Task, responseBody map[string]interface{}) {
	Expect(responseBody[models.JsonID]).To(Equal(float64(task.ID)))

	actualCreatedAt, err := time.Parse(time.RFC3339, responseBody[models.JsonCreatedAt].(string))
	Expect(err).ToNot(HaveOccurred())

	expectedCreatedAt, err := time.Parse(time.RFC3339, task.CreatedAt.Format(time.RFC3339))
	Expect(err).ToNot(HaveOccurred())

	// Truncate to the minute level
	actualTruncated := actualCreatedAt.Truncate(time.Minute)
	expectedTruncated := expectedCreatedAt.Truncate(time.Minute)

	// Compare the truncated timestamps
	Expect(actualTruncated).To(Equal(expectedTruncated))
}
