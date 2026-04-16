Feature: Contact page validation

  Scenario: Validate mandatory fields on contact form
    Given I go to the contact page from the home page
    When I click the submit button
    Then I should see validation error messages for mandatory fields
    When I populate all mandatory fields
    And I click the submit button
    Then I should not see any validation error messages