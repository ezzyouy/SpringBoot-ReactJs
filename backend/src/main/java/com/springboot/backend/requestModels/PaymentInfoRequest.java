package com.springboot.backend.requestModels;

import java.util.Objects;

public class PaymentInfoRequest {

    private String amount;
    private String currency;
    private String receiptEmail;

    public PaymentInfoRequest() {}

    public PaymentInfoRequest(String amount, String currency, String receiptEmail) {
        this.amount = amount;
        this.currency = currency;
        this.receiptEmail = receiptEmail;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getReceiptEmail() {
        return receiptEmail;
    }

    public void setReceiptEmail(String receiptEmail) {
        this.receiptEmail = receiptEmail;
    }

    @Override
    public String toString() {
        return "PaymentInfoRequest{" +
                "amount='" + amount + '\'' +
                ", currency='" + currency + '\'' +
                ", receiptEmail='" + receiptEmail + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PaymentInfoRequest that = (PaymentInfoRequest) o;
        return Objects.equals(amount, that.amount) && Objects.equals(currency, that.currency) && Objects.equals(receiptEmail, that.receiptEmail);
    }

    @Override
    public int hashCode() {
        return Objects.hash(amount, currency, receiptEmail);
    }
}
