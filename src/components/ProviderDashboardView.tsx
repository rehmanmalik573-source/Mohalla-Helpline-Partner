const getRequestServiceType = (request: ServiceRequest) =>
  language === 'hi'
    ? request.serviceTypeHi || request.serviceType
    : request.serviceType || request.serviceTypeHi;

const getRequestProblem = (request: ServiceRequest) =>
  language === 'hi'
    ? request.problemDescriptionHi ||
      request.problemDescription
    : request.problemDescription ||
      request.problemDescriptionHi;

const getRequestLocation = (request: ServiceRequest) =>
  language === 'hi'
    ? request.locationHi || request.location
    : request.location || request.locationHi;

const getRequestDate = (request: ServiceRequest) =>
  language === 'hi'
    ? request.preferredDateHi ||
      request.preferredDate
    : request.preferredDate ||
      request.preferredDateHi;

const getRequestTime = (request: ServiceRequest) =>
  language === 'hi'
    ? request.preferredTimeHi ||
      request.preferredTime
    : request.preferredTime ||
      request.preferredTimeHi;
