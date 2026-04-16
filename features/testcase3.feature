Feature: Test Case 3 - Cart validation

  Scenario: Validate product prices, subtotals and total
    Given I go to the contact page from the home page
    When I go to the Shop page from the home page and add all Test Case 3 products to the cart
    And I go to the cart page
    Then the price for each Test Case 3 product should be correct
    And the subtotal for each Test Case 3 product should be correct
    And the total should equal the sum of all Test Case 3 subtotals
