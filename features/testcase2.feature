Feature: Successful contact form submission

  Scenario Outline: Submit contact form successfully (run multiple times)
    Given I go to the contact page from the home page
    When I populate all mandatory fields
    And I click the submit button
    Then I should see a successful submission message

    Examples:
      | run |
      | 1   |
      | 2   |
      | 3   |
      | 4   |
      | 5   |